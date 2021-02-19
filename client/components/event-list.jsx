
import React from 'react';
import EventListItem from './event-list-item';

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    this.getEvents = this.getEvents.bind(this);
    this.eventList = this.eventList.bind(this);
  }

  getEvents() {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => this.setState({
        events: data
      }))
      .catch(err => console.error(err));
  }

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

  eventList() {
    const list = this.state.events.map(event =>
      <EventListItem
        key={event.eventId}
        getEvents={this.getEvents}
        updateEvent={this.updateEvent}
        deleteEvent = { this.props.deleteEvent }
        events={event}
        setView={this.props.setView} />);

    return list;
  }

  componentDidMount() {
    this.getEvents();
  }

  render() {
    // if (this.state.events) {
    //   console.log(this.state.events);
    // }

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
          <li className="nav-item">
            <a className="nav-link"
              href="#"
              onClick={() => this.props.setView('host', {})}>Your Event</a>
          </li>
        </ul>
        <div className="row justify-content-center my-5 px-2">
          {this.eventList()}
        </div>

      </div>

    );
  }
}
