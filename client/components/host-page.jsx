import React from 'react';

export default class HostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      eventId: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  getEvents() {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => this.setState({
        event: data
      }))
      .catch(err => console.error(err));
  }

  handleClick(event) {

    this.props.deleteEvent(this.props.event.eventId);
    this.props.setView('main', {});

  }

  render() {

    const { description, startDate, endDate, resortImg, resortName } = this.props.event;
    if (!this.props.event) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!this.props.event.eventId) {
      return (
        <div>NO ENTRY</div>
      );
    } else {
      return (
        <div className="host">
          <div className="container px-0">

            <div className="mt-2 host-content m-auto">
              <div className="d-flex">
                <img className="host-img" src={resortImg} />
              </div>

              <div className="p-4">
                <h2 className="text-center">{resortName}</h2>
                <div className="">
                  <p><i className="fas fa-calendar-day"></i>{start.toDateString()}</p>
                  <p><i className="fas fa-calendar-day"></i>  {end.toDateString()}</p>

                </div>

                <div className="eventdetaildesc"><h5 className="bold">Details</h5>
                  <p>{description}</p>
                </div>

              </div>
            </div>
            <div className="text-center pt-3">
              <button className="btn-detail" onClick={() => this.props.setView('main', {})}>close</button>
            </div>
          </div>

        </div>

      );
    }
  }
}
