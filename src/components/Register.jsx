import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './LoginRegister.css';

const Register = ({ setIsRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordAttempted, setPasswordAttempted] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordAttempted(true);
    setPasswordCriteria({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      digit: /\d/.test(newPassword),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let photoURL = '';
      if (photo) {
        const photoRef = ref(storage, `user_files/${user.uid}/profilePhoto`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }

      await updateProfile(user, { displayName: username, photoURL });

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { email, name: username, photoURL });

      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Registration error:', error.message);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="form-box register">
      <form onSubmit={handleSubmit}>
        <h1 className="white-text">Sign Up</h1>
        {errorMessage && <p className="message error white-text">{errorMessage}</p>}
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="icon" />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          {showPassword ? (
            <FaEyeSlash className="icon" onClick={togglePasswordVisibility} />
          ) : (
            <FaEye className="icon" onClick={togglePasswordVisibility} />
          )}
        </div>
        <div className="input-box">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showConfirmPassword ? (
            <FaEyeSlash className="icon" onClick={toggleConfirmPasswordVisibility} />
          ) : (
            <FaEye className="icon" onClick={toggleConfirmPasswordVisibility} />
          )}
        </div>
        {passwordAttempted && (
          <div className="password-instructions">
            <p className={passwordCriteria.length ? 'valid white-text' : 'invalid white-text'}>At least 8 characters long</p>
            <p className={passwordCriteria.uppercase ? 'valid white-text' : 'invalid white-text'}>At least one uppercase letter</p>
            <p className={passwordCriteria.lowercase ? 'valid white-text' : 'invalid white-text'}>At least one lowercase letter</p>
            <p className={passwordCriteria.digit ? 'valid white-text' : 'invalid white-text'}>At least one digit</p>
            <p className={passwordCriteria.specialChar ? 'valid white-text' : 'invalid white-text'}>At least one special character (e.g., !@#$%^&*)</p>
          </div>
        )}
        <div className="upload-photo">
          <input
            type="file"
            accept="image/*"
            id="photo"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="photo" className="upload-label">
            {photoPreview ? <img src={photoPreview} alt="Profile Preview" className="photo-preview" /> : 'Upload Photo'}
          </label>
        </div>
        <button type="submit">Register</button>
        <div className="register-link">
          <p className="white-text">Already have an account? 
            <button 
              type="button" 
              className="white-text" 
              onClick={() => setIsRegister(false)}>
                Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
