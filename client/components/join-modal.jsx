import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
function JoinModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState({ profileId: '', eventId: '' });

  useEffect(() => {
    setData({ profileId: props.profileId, eventId: props.eventId });

  }, []);

  // setEventId(props.eventId);
  function addAttendees(object) {
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)
    };

    fetch(`/api/attendees/${data.eventId}`, requestOption)
      .then(result => result.json())
      .catch(err => console.error(err));
  }

  function handleSubmit(event) {
    event.preventDefault();
    addAttendees(data);

    setModalIsOpen(false);
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    // console.log(newdata);

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
              id={data.profileId}
              // id={Number(name.profileId)}
              onChange = {e => handle(e) }
              // onChange={e => setName({ ...name, profileId: e.target.value })}
              value={props.name}></input>
          </div>
          <div>
            <label>event</label>
            <input
              type="text"
              name="eventId"
              id={data.eventId}
              onChange={e => handle(e)}
              // onChange={e => setName({ ...name, eventId: e.target.value })}
              value={props.event}></input>
          </div>
          <button className="btn-detail" onClick={handleSubmit}>confirm</button>
        </form>

      </Modal>
    </div>

  );
}

export default JoinModal;

// useEffect(() => {
//   setName({});
//   // setEventId(props.eventId);
// });

// function addAttendee(object) {

// useEffect(() => {

//   const requestOption = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(inputs)
//   };

//   fetch(`/api/attendees/${data.eventId}`, requestOption)
//     .then(result => result.json())
//     .then(data => console.log(data))
//     .catch(err => console.error(err));
// }, []);
// }
