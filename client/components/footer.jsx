import React from 'react';

function Footer(props) {
  function handleMain() {
    props.setView('main', {});
  }
  function handleProfile() {
    props.setView('profile', {});
  }
  // function handleNotification() {
  //   props.setView('notification', {});
  // }

  return (
    <div className="footer">
      <div className="nav footer-border px-3 py-1">
        <div className="text-center">
          <i className="far nav-icon fa-newspaper" onClick={handleMain}></i>
          <div className="icon-des">Events</div>
        </div>
        <div className="text-center">
          <i className="fas nav-icon fa-snowboarding" onClick={handleProfile}></i>
          <div className="icon-des">Profile</div>
        </div>
      </div>
    </div>

  );
}

export default Footer;
