import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
function JoinModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState({ profileId: '', eventId: '' });
  // const [eventId, setEventId] = useState('');

  const inputs = {
    profiledId: Number(name.profileId),
    eventId: Number(name.eventId)
  };

  // useEffect(() => {
  //   setName({});
  //   // setEventId(props.eventId);
  // });

  function addAttendee(object) {
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)
    };

    fetch(`/api/attendees/${name.eventId}`, requestOption)
      .then(result => result.json())
      .catch(err => console.error(err));

  }

  function handleSubmit(event) {
    event.preventDefault();
    addAttendee(inputs);
    setModalIsOpen(false);

  }

  // function handleChange(e) {
  //   setProfileId(e.target.value);
  //   setEventId(e.target.value);
  // }

  // console.log(name.profileId);

  // console.log(inputs);
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
              id={Number(name.profileId)}
              onChange={e => setName({ ...name, profileId: e.target.value })}
              value={name.profileId}></input>
          </div>
          <div>
            <label>event</label>
            <input
              type="text"
              name="eventId"
              id={name.eventId}
              onChange={e => setName({ ...name, eventId: e.target.value })}
              value={name.eventId}></input>
          </div>
          <button className="btn-detail" onClick={handleSubmit}>confirm</button>
        </form>

      </Modal>
    </div>

  );
}

export default JoinModal;
