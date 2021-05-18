import React from 'react';

export default function Homepage(props) {
  return (
    <>
      <div className="homepage-container turn">
        <div className="homepage-overlay">
          <div className="home-logo-name">
            <div className="justify-content-center">
              <img src="images/shred-logo-ol.png" alt="logo" className="main-logo" />
              <h1 className="home-title text-center">SHRED  BUDDIES</h1>

            </div>

            <div className="row justify-content-center mt-5 home-btn">
              <button className="login-btn btn-detail mb-2" onClick={() => props.setView('login', {})}>LOG IN</button>
              <button className="account-btn btn-detail" onClick={() => props.setView('create', {})}>CREATE ACCOUNT</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
