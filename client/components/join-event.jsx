import React from 'react';

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
      // .then(() => this.props.setView('main'))
      .catch(err => console.error(err));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addAttendee(this.state);
    this.props.setView('main');

  }
  // handleSubmit(object) {
  //   event.preventDefault();
  //   const requestOption = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(this.state)
  //   };
  //   fetch(`/api/event/${this.props.params.event.eventId}`, requestOption)
  //     .then(() => {
  //       this.props.setView('main');
  //     })
  //     .catch(err => console.error(err));
  // }

  componentDidMount() {
    this.setState({
      profileId: this.props.params.attendees,
      eventId: this.props.params.event
    });
  }

  // handleChange(events) {
  //   const input = event.target.name;
  //   const value = event.target.value;
  //   const newState = {};

  //   newState[input] = value;
  //   this.setState(newState);

  // }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    // const { profileId, eventId } = this.state;

    // console.log(this.props.params.attendees[0].name);
    // console.log(this.props.params.attendees[0].imgUrl);
    return (
      <div className="join-event">
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
                value={this.props.params.attendees}
                id={this.state.profileId} />
            </div>
            <div className="form-group">
              <label>event</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="eventId"
                value={this.props.params.event}
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
      </div>
    );
  }
}
