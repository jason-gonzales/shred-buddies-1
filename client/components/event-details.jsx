import React from 'react';

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      participants: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // componentDidMount(object) {
  //   fetch(`/api/event/${this.props.params.eventsId}`)
  //     .then(res => res.json())
  //     .then(events => this.setState({
  //       events: events
  //     }))
  //     .catch(err => console.error(err));
  // }

  handleClick() {
    this.setState(prevState => ({
      participants: prevState.participants + 1
    }));
  }

  render() {
    const { events } = this.props.params;
    const start = new Date(events.start);
    const end = new Date(events.end);

    if (!this.props.params.events) {
      return (
        <div>NO ENTRY</div>
      );
    } else {
      return (
        <div className="event-detail pt-3">
          <div className="container card event">
            <div className=" m-0 d-flex justify-content-center">
              <img src={events.resortImage} alt={events.resortName} className="imgEventDetails" />
            </div>
            <div>
              <div className=" text-center detail-title"> <p><i className="fas fa-tram"></i>{events.resortName}</p></div>
              <div>HOST: {events.resortName}</div>
              <div className="col-md-6 card-body">
                <p><i className="fas fa-calendar-day"></i> Start : {start.toDateString()}</p>
                <p><i className="fas fa-calendar-day"></i> End : {end.toDateString()}</p>
                <p><i className="fas fa-snowboarding boarder"></i> Shredders : {this.state.participants}</p>

                <div className="eventdetaildesc mt-1">
                  <p>{events.eventDescription}</p>
                </div>
              </div>
              <div className="text-center">
                <button onClick={this.handleClick} className="btn-eventdetail">request to join</button>
              </div>
            </div>
          </div>

        </div>

      );
    }
  }
}
