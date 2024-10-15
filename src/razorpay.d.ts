// src/razorpay.d.ts
interface RazorpayOptions {
    key: string;
    amount: string;
    currency: string;
    name: string;
    description: string;
    handler: (response: { razorpay_payment_id: string }) => void;
    prefill: {
      name: string;
      email: string;
      contact: string;
    };
    theme: {
      color: string;
    };
  }
  
  declare global {
    interface Window {
      Razorpay: {
        new (options: RazorpayOptions): {
          open: () => void;
        };
      };
    }
  }
  
  export {};
  