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
    // console.log(this.props.params.guest.name);
    // const { events } = this.props.params;
    const start = new Date(this.props.params.events.start);
    const end = new Date(this.props.params.events.end);

    if (!this.props.params.events) {
      return (
        <div>NO ENTRY</div>
      );
    } else {
      return (
        <div className="event-detail pt-3">
          <div className="container px-0">
            <h2 className="text-center"><i className="fas fa-tram"></i>{this.props.params.events.resortName}</h2>
            <div className="text-center pb-3">Hosted by <b>{this.props.params.events.profileName}</b></div>
            <div className="event-page">
              <div className=" m-0 d-flex justify-content-center">
                <img src={this.props.params.events.resortImage} alt={this.props.params.events.resortName} className="imgEventDetails" />
              </div>
              <div>
                <div className="card-body m-auto event-info col-md-9">
                  <p><i className="fas fa-calendar-day"></i> Start : {start.toDateString()}</p>
                  <p><i className="fas fa-calendar-day"></i> End : {end.toDateString()}</p>
                  <p><i className="fas fa-snowboarding boarder"></i> Attending :
                    {this.props.params.guest ? <>
                      <img className="attending-pic"
                        src={this.props.params.guest.imgUrl}
                        alt={this.props.params.guest.name} /></> : null}
                  </p>

                  <div className="eventdetaildesc mt-1"><h5 className="bold">Details</h5>
                    <p>{this.props.params.events.eventDescription}</p>
                  </div>
                </div>
              </div>
            </div><div className="text-center m-2">
              <button className="btn-detail" onClick={() => this.props.setView('main', {})}>close</button>
            </div>

          </div>

        </div>

      );
    }
  }
}
