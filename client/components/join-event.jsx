import React from 'react';
import JoinModal from './join-modal';

export default class JoinEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileId: '',
      eventId: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addAttendee = this.addAttendee.bind(this);

  }

  addAttendee(object) {
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)
    };

    fetch(`/api/attendees/${this.state.eventId}`, requestOption)
      .then(result => result.json())
      .catch(err => console.error(err));
  }

  handleSubmit(event) {

    event.preventDefault();
    this.addAttendee(this.state);
    this.props.setView('main');

  }

  componentDidMount() {
    this.setState({
      profileId: this.props.params.attendees,
      eventId: this.props.params.event
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });

  }

  render() {
    const guestPic = this.props.params.guestPicture;

    const guestPicture = guestPic.map((join, index) =>
      <img src={join} key={index} className="attending-pic" />);

    const start = new Date(this.props.params.events.start);
    const end = new Date(this.props.params.events.end);

    if (!this.props.params.events) {
      return (
        <div>No Entry</div>
      );
    } else {
      return (
        <>

          <div className="event-detail pt-3">
            <div className="container px-0 col-lg-9">
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
                      {this.props.params.events ? <>
                        <img className="attending-pic"
                          src={this.props.params.events.profileImage}
                          alt={this.props.params.events.profileName} /></> : null}
                      {(this.props.params.guestImage || this.props.params.guestName)
                        ? <img className="attending-pic"
                          src={this.props.params.guestImage}
                          alt={this.props.params.guestName} /> : null
                      }
                      {guestPicture}
                    </p>

                    <div className="eventdetaildesc mt-1"><h5 className="bold">Details</h5>
                      <p>{this.props.params.events.eventDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <JoinModal
                  setView={this.props.setView}
                  name={this.props.params.userName}
                  event={this.props.params.eventName}
                  profileId={this.props.params.attendees}
                  eventId={this.props.params.event} />
                {/* <button className="btn-detail" onClick={() => this.props.setView('main', {})}>back</button> */}
              </div>

            </div>

          </div>
          {/* <div className="join-event">
            <form className="mx-3">
              <div className="form-group col-md-9 mx-auto">
                <label htmlFor="exampleFormControlInput1">
                  <h3 className="mt-2">Join Event</h3>
                </label>
                <div className="form-group">
                  <label>name</label>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    name="profileId"
                    value={this.props.params.userName}
                    id={this.state.profileId} />
                </div>
                <div className="form-group">
                  <label>event</label>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    name="eventId"
                    value={this.props.params.eventName}
                    id={this.state.eventId} />
                </div>

              </div>
              <div className="text-center">
                <button
                  type="submit"
                  onClick={this.handleSubmit}
                  className="btn-detail m-auto">join</button>
              </div>
            </form>
          </div> */}
        </>
      );
    }

  }
}
