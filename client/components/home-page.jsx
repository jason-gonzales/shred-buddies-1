import React from 'react';

export default function Homepage(props) {
  return (
    <>
      <div className="homepage-overlay"></div>
      <div className="homepage-container">

        <div className="row dropdown-itemd-flex align-items-center justify-content-center">
          <h1 className="home-title d-flex text-center mt-5">SHRED  BUDDIES</h1>
          <div className="mt-5 border">
            {/* <img src="\images\logo.png" alt=""/> */}
          </div>
          <div className="row justify-content-center mt-5 home-btn">
            <button className="btn-detail mb-2" onClick={() => props.setView('login', {})}>LOG IN</button>
            <button className="btn-detail" onClick={() => props.setView('create', {})}>CREATE ACCOUNT</button>
          </div>
        </div>
      </div>
    </>
  );
}
