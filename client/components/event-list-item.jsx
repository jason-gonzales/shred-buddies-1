import React from 'react';

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      event: null,
      guests: [],
      attending: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getGuests = this.getGuests.bind(this);
    // this.guestList = this.guestList.bind(this);
    // this.attend = this.attend.bind(this);
  }

  handleClick() {
    // if (this.state.events) {
    this.props.setView('eventDetails', { events: this.props.events, guest: this.props.guest });
    // }
  }

  handleDelete() {
    this.props.deleteEvent(this.props.events.eventId);

  }

  getGuests() {

    fetch(`/api/profile/${this.props.user}`)
      .then(result => result.json())
      .then(data => this.setState({
        guests: [...this.state.guests, data]
      }))
      // .then(data => {
      //   this.props.addGuest(data);
    // this.setState({
    //   attending: true
    // });

    // })

      // .then(this.setState({
      //   attending: true
      // }))
      .catch(err => console.error(err));
  }

  // componentDidMount() {
  //   this.getGuests();
  // }
  // getGuests() {

  //   fetch(`/api/profile/${this.props.user}`)
  //     .then(result => result.json())
  //     .then(data => this.setState({
  //       guests: data

  //     }))
  //     .catch(err => console.error(err));
  // }

  // attend() {
  //   // if (this.props.user) {
  //   this.setState({ attending: true });
  //   // }
  // }

  // guestList() {
  //   const list = this.state.guests.map(guest =>
  //     <img
  //       className="attending-pic pl-2 m-auto"
  //       key={guest.profileId}
  //       src={guest.imgUrl}
  //       alt={guest.name}/>
  //   );

  //   if (this.state.attending === false) {
  //     return null;
  //   }
  //   return list;
  // }

  // componentDidMount() {
  //   this.getGuests();
  // }

  render() {
    // console.log(this.props.guest);

    const profile = this.props.events.profileId;
    const user = this.props.user;
    const { events } = this.props;

    const start = new Date(events.start);
    const end = new Date(events.end);

    return (
      <div className="event-size m-auto">
        <div className="card bg-dark text-white my-3">
          <img className="event-img" src={this.props.events.resortImage} alt="Card image" />
          <div className="card-img-overlay">
            <div className="col-lg-12" onClick={this.handleClick}>
              <div className="d-flex">
                <h3 className="card-title">{this.props.events.resortName}</h3>
                <img className="host-pic ml-auto"
                  src={this.props.events.profileImage}
                  alt="shredder-host" />
              </div>
              <p className=''>Hosted by <b>{this.props.events.profileName}</b></p>
              <p className="mt-n2">{start.toDateString()} - {end.toDateString()}</p>

              <p>{events.eventDescription}</p>

              <div>attending: <span className="pl-2">
                {this.props.user ? <>
                  <img
                    className="attending-pic"
                    src={this.props.events.profileImage}
                    alt={this.props.events.profileName}/></> : null}
                {this.props.guest ? <>
                  <img
                    className="attending-pic"
                    src={this.props.guest.imgUrl}
                    alt={this.props.guest.name}/></> : null}
                {/* {this.guestList()} */}

                {/* <img
                  className="attending-pic pl-2"
                  src="/images/chewbacca.png"
                  alt="shredder-guest" /> */}
              </span>
              </div>
            </div>
            <div className="pt-2"> {
              profile !== user ? <>
                <div className="text-center">
                  <button
                    onClick={this.getGuests}
                    className="join-button"
                  >join</button></div></> : null
            }

            </div>

            <div className="m-2">
              {profile === user ? <>
                <button
                  onClick={() => this.props.setView('updateEvent', { event: this.props.events })}
                  className="btn-event-card col-6">update</button>
                <button
                  onClick={this.handleDelete}
                  className="btn-event-card col-6">delete</button>
              </> : null}

            </div>
          </div>
        </div>
      </div>

    );
  }
}
