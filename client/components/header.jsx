import React from 'react';

function Header(props) {
  function handleMain() {
    props.setView('main', {});
  }

  return (
    <header className=" container-fluid d-flex justify-content-center align-items-center">
      <h2 className="head-title" onClick={handleMain}>Shred Buddies</h2>

    </header>
  );
}
export default Header;
