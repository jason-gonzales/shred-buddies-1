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

  // componentDidMount() {
  //   fetch(`/api/resort/${this.props.params.resortId}`)
  //     .then(res => res.json())
  //     .then(resort =>
  //       this.setState({
  //         resort: resort
  //       }))
  //     .catch(err => console.error(err));

  // }

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
    // this.props.isAttending(this.state);
    if (this.props.event) {

      this.props.setView('host');
      // this.props.setView('host', { eventId: this.props.event });

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
            {/* <input onChange={this.handleChange} value={this.props.params.resortId}>{this.props.params.resortId}</input> */}
            {/* <select
              className="ml-4"
              onChange={this.handleChange}
              id={this.state.resortId}
              name="resortId" >
              <option> select mountain</option>
              <option value="1">mammoth</option>
              <option value="2">bear mountain</option>
              <option value="3">mountain high</option>
            </select> */}
          </div>
          <div className="d-flex col-md-9 mx-auto">
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
          {/* <div className="form-group mt-2 col-md-9 mx-auto">
            <label htmlFor="exampleFormControlSelect1">how many shredders</label>
            <select
              onChange={this.handleChange}
              value={this.state.profileId} name="profileId"
              className="form-control"
              id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div> */}
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
