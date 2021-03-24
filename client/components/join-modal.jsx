import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
function JoinModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState({ profileId: '', eventId: '' });
  // const [eventId, setEventId] = useState('');

  const inputs = {
    profiledId: Number(data.profileId),
    eventId: Number(data.eventId)
  };

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

  function handleSubmit(event) {
    event.preventDefault();

    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs)
    };

    fetch(`/api/attendees/${data.eventId}`, requestOption)
      .then(result => result.json())

      .catch(err => console.error(err));

    setModalIsOpen(false);

  }

  // function handleChange(e) {
  //   setProfileId(e.target.value);
  //   setEventId(e.target.value);
  // }
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    // console.log(newdata);
  }

  // console.log(data.eventId);

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
              id="profileId"
              // id={Number(name.profileId)}
              onChange = {e => handle(e) }
              // onChange={e => setName({ ...name, profileId: e.target.value })}
              value={data.profileId}></input>
          </div>
          <div>
            <label>event</label>
            <input
              type="text"
              name="eventId"
              id="eventId"
              onChange={e => handle(e)}
              // onChange={e => setName({ ...name, eventId: e.target.value })}
              value={data.eventId}></input>
          </div>
          <button className="btn-detail" onClick={handleSubmit}>confirm</button>
        </form>

      </Modal>
    </div>

  );
}

export default JoinModal;
