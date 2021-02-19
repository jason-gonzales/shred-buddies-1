import React from 'react';

// export default function EventListItem(props) {

//   function handleClick() {

//     props.setView('eventDetails', { events: props.events });

//   }

//   function handleUpdate() {
//     props.setView('updateEvent', {});
//   }

//   function handleDelete() {
//     props.deleteEvent(props.events.eventId);
//     props.getEvents(props.events);
//   }

//   const start = new Date(props.events.start);
//   const end = new Date(props.events.end);

//   function updateEvent(object) {
//     const requestOption = {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(object)
//     };
//     fetch(`/api/event/${props.events.eventId}`, requestOption)
//       .then(() => {

//       });
//   }

//   console.log(props.events);
//   return (

//     <div className="event-size col-md-4 m-auto">
//       <div className="card bg-dark text-white my-3">
//         <img className="event-img" src={props.events.resortImage} alt="Card image" />
//         <div className="card-img-overlay">
//           <div className="" onClick={handleClick}>
//             <div className="d-flex">
//               <h3 className="card-title">{props.events.resortName}</h3>
//               <img className="host-pic ml-auto"
//                 src={props.events.profileImage}
//                 alt="shredder-host" />
//             </div>
//             <p className=''>Hosted by <b>{props.events.profileName}</b></p>
//             <p className="mt-n2">{start.toDateString()} - {end.toDateString()}</p>
//             {/* <p className="mt-n4">ends: {end.toDateString()}</p> */}

//             <div>attending:
//               <img
//                 className="attending-pic pl-2"
//                 src="/images/chewbacca.png"
//                 alt="shredder-host" />
//             </div>
//           </div>

//           <div className="m-2">
//             <button
//               onClick={handleUpdate}
//               className="btn-event-card col-6">update</button>
//             <button onClick={handleDelete}
//               className="btn-event-card col-6">delete</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      event: null
    };
    this.handleClick = this.handleClick.bind(this);
    // this.updateEvent = this.updateEvent.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    // if (this.state.events) {
    this.props.setView('eventDetails', { events: this.props.events });
    // }
  }

  // handleUpdate() {
  //   this.props.setView('updateEvent', {});
  // }

  handleDelete() {
    this.props.deleteEvent(this.props.events.eventId);
    this.props.getEvents(this.props.events);
  }

  // updateEvent(object) {
  //   const requestOption = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(this.props.events)
  //   };
  //   fetch(`/api/event/${this.state.events.eventId}`, requestOption)
  //     .then(res => res.json())
  //     .then(result => this.setState({
  //       event: result
  //     }))
  //     .catch(err => console.error(err));
  // }

  render() {

    const { events } = this.props;

    const start = new Date(events.start);
    const end = new Date(events.end);

    return (
      <div className="event-size col-md-4 m-auto">
        <div className="card bg-dark text-white my-3">
          <img className="event-img" src={this.props.events.resortImage} alt="Card image" />
          <div className="card-img-overlay">
            <div className="" onClick={this.handleClick}>
              <div className="d-flex">
                <h3 className="card-title">{this.props.events.resortName}</h3>
                <img className="host-pic ml-auto"
                  src={this.props.events.profileImage}
                  alt="shredder-host" />
              </div>
              <p className=''>Hosted by <b>{this.props.events.profileName}</b></p>
              <p className="mt-n2">{start.toDateString()} - {end.toDateString()}</p>
              {/* <p className="mt-n4">ends: {end.toDateString()}</p> */}

              <div>attending:
                <img
                  className="attending-pic pl-2"
                  src="/images/chewbacca.png"
                  alt="shredder-host" />
              </div>
            </div>

            <div className="m-2">
              <button
                onClick={() => this.props.setView('updateEvent', { event: this.props.events })}
                className="btn-event-card col-6">update</button>
              <button onClick={this.handleDelete}
                className="btn-event-card col-6">delete</button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
