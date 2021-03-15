import React from 'react';

export default class JoinEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendees: '',
      name: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleSubmit(object) {
    event.preventDefault();
    const requestOption = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/event/${this.props.params.event.eventId}`, requestOption)
      .then(() => {
        this.props.setView('main');
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.setState({
      attendees: this.props.params.attendees[0].imgUrl,
      name: this.props.params.attendees[0].name
    });
  }

  handleChange(events) {
    const input = event.target.name;
    const value = event.target.value;
    const newState = {};

    newState[input] = value;
    this.setState(newState);

  }

  render() {
    // console.log(this.state);
    // console.log(this.props.params.attendees[0].name);
    // console.log(this.props.params.attendees[0].imgUrl);
    return (
      <div className="join-event">
        <form className="mx-3">
          <div className="form-group col-md-9 mx-auto">
            <label>
              <h3 className="mt-2">Join Event</h3>
            </label>
            <input
              onChange={this.handleChange}
              type ="text"
              name="name"
              value={this.state.name}/>
            <input
              onChange={this.handleChange}
              type="text"
              name="attendees"
              value={this.state.attendees} />
          </div>
          <div className="text-center">
            <button
              onClick={this.handleSubmit}
              className="btn-detail m-auto">join</button>
          </div>
        </form>
      </div>
    );
  }
}