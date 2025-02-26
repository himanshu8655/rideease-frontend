import React, { useState } from 'react';
import './CreateAccount.css';
import { signup } from '../../service/AuthService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import default styles for react-toastify

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null); // State to hold image
  const [contact_no, setContact] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(firstName, lastName, email, password, image, contact_no);
      toast.success("User Created Successfully!")
      navigate("/login")

    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create image preview
    }
  };

  return (
    <div className="create-account-container">
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
      <form className="create-account-form" onSubmit={handleSignup}>
        <h1>Create an Account</h1>
        <div className="name-inputs">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Enter Contact Number"
          value={contact_no}
          onChange={(e) => {
            const sanitizedValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
            setContact(sanitizedValue);
          }}
          maxLength="10"
          pattern="[0-9]{10}"
          required
        />
        {/* <div className="image-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && <img src={image} alt="Preview" className="image-preview" />}
        </div> */}
        <button type="submit">Sign Up</button>
        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
