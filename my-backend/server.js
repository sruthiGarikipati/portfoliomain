require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const crypto = require('crypto');
const axios = require('axios');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = require('./login-4dec7-firebase-adminsdk-7pi5n-df56c523c4.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://login-4dec7-default-rtdb.firebaseio.com"
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route for sending password reset email
app.post('/sendPasswordResetEmail', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: 'Email is required.' });
  }

  try {
    const link = await admin.auth().generatePasswordResetLink(email);
    res.status(200).send({ message: 'A password reset link has been sent to your email.' });
  } catch (error) {
    console.error('Error generating password reset link:', error);
    res.status(500).send({
      message: 'An error occurred while sending the reset link.',
      error: error.message,
    });
  }
});

// Route for creating a Razorpay order
app.post('/create-razorpay-order', async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).send({ message: 'Amount is required.' });
  }

  try {
    const response = await axios.post(
      'https://api.razorpay.com/v1/orders',
      {
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        payment_capture: 1,
      },
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY}:${process.env.RAZORPAY_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).json({ orderId: response.data.id });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).send({
      message: 'An error occurred while creating the Razorpay order.',
      error: error.message,
    });
  }
});

// Route for verifying Razorpay payment
app.post('/verification', async (req, res) => {
  const razorpay_secret = process.env.RAZORPAY_SECRET;

  try {
    console.log('Received Webhook Event:', req.body);
    console.log('Request Headers:', req.headers);

    const event = req.body.event;
    const payload = req.body.payload;
    const received_signature = req.headers['x-razorpay-signature'];

    // Generate the expected signature
    const generated_signature = crypto.createHmac('sha256', razorpay_secret)
      .update(`${payload.order_id}|${payload.payment_id}`)
      .digest('hex');

    console.log('Generated Signature:', generated_signature);
    console.log('Received Signature:', received_signature);

    if (generated_signature === received_signature) {
      if (event === 'payment.captured') {
        const { payment_id, order_id, amount } = payload;
        await generateInvoiceAndSendEmail({
          email: payload.email,
          payment_id,
          order_id,
          amount,
        });
        res.status(200).send('Payment captured and invoice sent');
      } else if (event === 'payment.failed') {
        res.status(200).send('Payment failed');
      } else {
        res.status(400).send('Unknown event');
      }
    } else {
      console.error('Signature mismatch');
      res.status(400).send('Signature mismatch');
    }
  } catch (error) {
    console.error('Error handling webhook event:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Helper function to generate invoice and send email
async function generateInvoiceAndSendEmail({ email, payment_id, order_id, amount }) {
  const invoicesDir = path.join(__dirname, 'invoices');

  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir);
  }

  const invoicePath = path.join(invoicesDir, `invoice_${order_id}.pdf`);

  try {
    // Generate PDF Invoice
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(invoicePath));

    doc.fontSize(20).text('Invoice', { align: 'center' });
    doc.text(`Order ID: ${order_id}`);
    doc.text(`Payment ID: ${payment_id}`);
    doc.text(`Amount: ₹${amount / 100}`);
    doc.end();

    await new Promise((resolve, reject) => {
      doc.on('end', resolve);
      doc.on('error', reject);
    });

    // Send email with invoice attachment
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Invoice for your Payment',
      text: 'Thank you for your payment! Attached is your invoice.',
      attachments: [
        {
          filename: `invoice_${order_id}.pdf`,
          path: invoicePath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log('Invoice email sent successfully');
  } catch (error) {
    console.error('Error generating invoice or sending email:', error);
    throw error;
  }
}

// Listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});







