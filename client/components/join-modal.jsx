import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
function JoinModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState({ profileId: '', eventId: '' });

  useEffect(() => {
    setData({ profileId: props.profileId, eventId: props.eventId });

  }, []);

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
    props.setView('main');
  }

  // function handle(e) {
  //   const newdata = { ...data };
  //   newdata[e.target.id] = e.target.value;
  //   setData(newdata);

  // }

  return (

    <div className="join-modal p-2">
      <button className="btn-detail" onClick={() => setModalIsOpen(true)}>join</button>
      <Modal isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={
          {

            content: {
              borderRadius: '30px',
              margin: 'auto',
              width: '300px',
              height: '300px',
              padding: '40px',
              background: '#c9d6df',
              overflow: 'hidden'

            }
          }
        }>
        <div className="mt-n2">
          <h2 className="m-auto text-center mt-n2">Join Event</h2>
        </div>
        <form>

          <div className="form-group">
            <label>name</label>
            <div>{props.name}</div>
            {/* <input
              className="input-width"
              type="text"
              name="profileId"
              id={data.profileId}
              onChange = {e => handle(e) }
              value={props.name}></input> */}
          </div>
          <div className="form-group">
            <label>event</label>
            <div>{props.event}</div>
            {/* <input
              className="input-width"
              type="text"
              name="eventId"
              id={data.eventId}
              onChange={e => handle(e)}
              value={props.event}></input> */}
          </div>
          <div className="text-center pt-2">
            <button className="btn-modal p-1" onClick={handleSubmit}>confirm</button>
          </div>
        </form>

      </Modal>
    </div>

  );
}

export default JoinModal;
