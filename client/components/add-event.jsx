import React from 'react';

export default class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      resortId: '',
      description: '',
      startDate: '',
      endDate: '',
      profileId: '',
      resortName: ''

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount() {
    this.setState({
      resortName: this.props.params.resortId.name,
      resortId: this.props.params.resortId.resortId
    });
  }

  handleChange(events) {
    const input = event.target.name;
    const value = event.target.value;
    const newState = {};
    newState[input] = value;
    this.setState(newState);

  }

  handleClick(event) {
    // console.log(this.state);
    event.preventDefault();
    this.props.createEvent(this.state);
    if (this.props.event) {

      this.props.setView('host');

    }
  }

  render() {

    // console.log(this.props.params.resortId.name);

    if (!this.props.params.resortId) {
      return null;
    }

    return (
      <div className="add-event">
        <form className="mx-3">
          <div className="form-group col-md-9 mx-auto">
            <label htmlFor="exampleFormControlInput1">
              <h3 className="mt-2">Add Event</h3>
            </label>
            <input type="text"
              name="resortName"
              value={this.props.params.resortId.name}
              onChange={this.handleChange}
              id={this.state.resortName}/>
          </div>
          <div className="add-form col-md-9 mx-auto">
            <div className="form-group">
              <label>start date</label>
              <input
                onChange={this.handleChange}
                value={this.state.startDate}
                name="startDate" type="date"
                className="form-control start-input"
                id="start-id" />
            </div>
            <div className="form-group">
              <label>end date</label>
              <input
                onChange={this.handleChange}
                value={this.state.endDate}
                name="endDate" type="date"
                className="form-control end-input"
                id="end-id" />
            </div>
          </div>
          <div className="form-group col-md-9 mx-auto">
            <label htmlFor="exampleFormControlTextarea1">event details</label>
            <textarea
              onChange={this.handleChange}
              value={this.state.description}
              name="description"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"></textarea>
          </div>
          <div className="text-center">
            <button
              onClick={this.handleClick}
              className="btn-detail m-auto">add event</button>
          </div>
        </form>
      </div>
    );
  }
}
