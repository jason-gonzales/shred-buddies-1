
import React from 'react';
import EventListItem from './event-list-item';
// import Attending from './attending';

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
      // guests: []
      // isLoading: false
    };
    this.getEvents = this.getEvents.bind(this);

  }

  getEvents() {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => this.setState({
        events: data
      }))
      .catch(err => console.error(err));
  }

  // getGuests() {
  //   fetch('/api/profile')
  //     .then(result => result.json())
  //     .then(data => this.setState({
  //       guests: data
  //       // isLoading: false
  //     }))
  //     .catch(err => console.error(err));
  // }
  // updateEvent(object) {
  //   const requestOption = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(object)
  //   };
  //   fetch(`/api/event/${this.state.events.eventId}`, requestOption)
  //     .then(() => {
  //       this.setView('updateEvent');
  //     });
  // }

  // eventList() {
  //   const list = this.state.events.map(event =>
  //     <EventListItem
  //       addGuest={this.props.addGuest}
  //       user={this.props.user.profileId}
  //       key={event.eventId}
  //       getEvents={this.getEvents}
  //       updateEvent={this.updateEvent}
  //       deleteEvent = { this.props.deleteEvent }
  //       events={event}
  //       setView={this.props.setView}
  //       guest={this.props.guest}
  //       isAttending={this.props.isAttending}
  //     />);

  //   return list;

  // }

  componentDidMount() {
    this.getEvents();

  }

  render() {

    const list = this.state.events.map(event =>
      <EventListItem
        addGuest={this.props.addGuest}
        user={this.props.user.profileId}
        userName={this.props.user.name}
        key={event.eventId}
        getEvents={this.getEvents}
        updateEvent={this.updateEvent}
        deleteEvent={this.props.deleteEvent}
        events={event}
        setView={this.props.setView}
        guest={this.props.guest}
        isAttending={this.props.isAttending}
      />);

    return (

      <div className="main-page">
        <ul className="nav nav-events">
          <li className="nav-item">
            <a className="nav-link active"
              href="#"
              onClick={() => this.props.setView('resortList', {})}>Add Event</a>
          </li>
          <li className="nav-item">
            <a className="nav-link"
              href="#"
              onClick={() => this.props.setView('login', {})}>Change User</a>
          </li>
        </ul>
        <div className="text-center welcome">
          <h3>Welcome {this.props.user.name}</h3>
          <h5>select an event to join</h5>
        </div>
        <div className="d-flex flex-wrap justify-content-center mb-5">
          {list}
          {/* <Attending guest={this.props.guest} /> */}
        </div>

      </div>

    );
  }
}
