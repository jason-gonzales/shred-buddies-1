import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
function JoinModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profileId, setProfileId] = useState('');
  const [eventId, setEventId] = useState('');

  function handleChange(e) {
    setProfileId(e.target.value);
    setEventId(e.target.value);
  }
  return (
    <div className="join-modal">
      <button className="btn-detail" onClick={() => setModalIsOpen(true)}>join</button>
      <Modal isOpen={modalIsOpen}>
        <h2>Join Event</h2>
        <form>
          <div className="form-group">
            <label>name</label>
            <input
              type="text"
              name="profileId"
              id={profileId}
              onChange={handleChange}
              value={props.name}></input>
          </div>
          <div>
            <label>event</label>
            <input
              type="text"
              name="eventId"
              id={eventId}
              onChange={handleChange}
              value={props.event}></input>
          </div>
        </form>
        <button className="btn-detail" onClick={() => setModalIsOpen(false)}>confirm</button>
      </Modal>
    </div>

  );
}

export default JoinModal;
