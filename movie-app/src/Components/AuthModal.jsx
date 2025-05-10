import React from 'react';
import '../Css/AuthMdoel.css'; // Make sure this path is correct

const AuthModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login or Register</h2>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="buttons">
            <button type="submit">Login</button>
            <button type="button">Register</button>
          </div>
        </form>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AuthModal;
