
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

  eventList() {
    const list = this.state.events.map(event =>
      <EventListItem key={event.eventId} events={event} setView={this.props.setView} />);

    return list;
  }

  componentDidMount() {
    this.getEvents();
  }

  render() {

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
              href="#">Upcoming Event</a>
          </li>
          <li className="nav-item">
            <a className="nav-link"
              href="#"
              onClick={() => this.props.setView('host', {})}>Your Event</a>
          </li>
        </ul>

        <div className="event-card container">
          <div className="row d-flex justify-content-center">
            {this.eventList()}
          </div>
        </div>
      </div>

    );
  }
}
