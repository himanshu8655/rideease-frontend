import React from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate();

  const handleClick = (imageName) => {
    alert(`Button clicked for ${imageName}`);
  };

  const onUserTypeSelected = (user_type) => {
    sessionStorage.setItem("user_type", user_type);
    navigate('/home');
  }

  return (
    <div className="container">
      <div className="image-container" onClick={()=>onUserTypeSelected('commuter')}>
        <img src="\images\commuter.png " alt="Image 1" className="image" />
        <button className="btn" onClick={() => handleClick('Image 1')}>
          Join A Carpool
        </button>
      </div>
      <div className="image-container" onClick={()=>onUserTypeSelected('carpool-owner')}>
        <img src="\images\carpool.png " alt="Image 2" className="image" />
        <button className="btn" onClick={() => handleClick('Image 2')}>
          Create a Carpool
        </button>
      </div>
    </div>
  );
}

export default User;
