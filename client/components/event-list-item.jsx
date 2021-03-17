import React from 'react';

// import MyContext from './my-context';

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      event: null,
      guests: null,
      attend: null,
      attendees: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.isAttending = this.isAttending.bind(this);
    this.getAttendees = this.getAttendees.bind(this);
    // this.getGuests = this.getGuests.bind(this);
    // this.guestList = this.guestList.bind(this);
    // this.attend = this.attend.bind(this);
    // this.addGuest = this.addGuest.bind(this);
  }

  handleClick() {
    // if (this.state.events) {
    this.props.setView('eventDetails', { events: this.props.events, guest: this.props.guest });
    // }
  }

  handleDelete() {
    this.props.deleteEvent(this.props.events.eventId);

  }

  getAttendees() {
    fetch('/api/attendees')
      .then(res => res.json())
      .then(data => this.setState({ guests: data }))
      .catch(err => console.error(err));
  }

  isAttending(object) {
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)
    };

    fetch(`/api/attendees/${this.props.events.eventId}`, requestOption)
      .then(result => result.json())
      .then(data => this.setState({
        // view: { name: 'joinEvent', params: {} },
        attend: data
      }))
      .catch(err => console.error(err));
  }

  // addGuest() {
  //   const requestOption = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(this.state.attendees)
  //   };
  //   fetch(`/api/event/${this.props.events.eventId}`, requestOption)
  //     .then(() => {
  //       this.props.setView('main');
  //     })
  //     .catch(err => console.error(err));
  // }

  componentDidMount() {
    // this.setState({
    //   attendees: this.props.events.attendees
    // });
    this.getAttendees();

  }
  // getAttendees() {
  //   fetch('/api/attendees')
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //     .catch(err => console.error(err));
  // }
  // getGuests() {
  //   this.props.isAttending(this.state);
  // }

  // getGuests() {

  // fetch(`/api/profile/${this.props.user}`)
  //   .then(result => result.json())
  // .then(data => this.setState({
  //   guests: [...this.state.guests, data]

  // }))
  // )
  // .then(data => {
  //   this.props.addGuest(data);
  // this.setState({
  //   attending: true
  // });

  // })

  // .then(this.setState({
  //   attending: true
  // }))
  //     .catch(err => console.error(err));
  // }

  // componentDidUpdate(newProps, newState) {
  //   if (newState.guests === this.state.guests) {
  //     this.setState({ guests: newState.guests });
  //   }
  // }
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
    const eventCard = this.props.events.eventId;
    let joined;
    const guestPic = [];
    const a = [];
    if (this.state.guests === null) {
      return null;
    } else if (this.state.guests) {
      joined = this.state.guests;
      joined.forEach(function (obj) {
        a.push(obj);

      });
      // console.log(a);

      for (let i = 0; i < a.length; i++) {
        if (eventCard === a[i].eventId) {
          guestPic.push(a[i].imgUrl);

        }
      }
    }
    const profile = this.props.events.profileId;
    const user = this.props.user;
    const { events } = this.props;

    const start = new Date(events.start);
    const end = new Date(events.end);

    return (
      <>

        <div className="event-size mx-lg-2">
          <div className="card bg-dark text-white my-3">
            <img className="event-img" src={this.props.events.resortImage} alt="Card image" />
            <div className="card-img-overlay">
              <div className="" onClick={this.handleClick}>
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
                      alt={this.props.events.profileName} /></> : null}

                  {guestPic.map(join =>
                    <img src={join} key={join} className="attending-pic" />)
                  }
                  {/* <MyContext.Consumer>
                  {
                    guest =>
                      <React.Fragment><div guest={guest}>{
                        guest && this.props.user
                          ? <img className="attending-pic"
                            src={guest.imgUrl} /> : null
                      }

                      </div>
                      </React.Fragment>}
                </MyContext.Consumer> */}
                  {/* {this.state.guests ? <>

                  <img
                    className="attending-pic"
                    src={this.state.guests.imgUrl}
                    alt={this.state.guests.name} /></> : null} */}

                  {/* {this.props.guest ? <>
                  <img
                    className="attending-pic"
                    src={this.props.guest.imgUrl}
                    alt={this.props.guest.name}/></> : null} */}
                  {/* {this.guestList()} */}

                  {/* <img
                  className="attending-pic pl-2"
                  src="/images/chewbacca.png"
                  alt="shredder-guest" /> */}
                </span>
                </div>
              </div>
              <div className="mt-2 pt-2"> {
                profile !== user ? <>
                  <div className="text-center">
                    <button
                      onClick={() => this.props.setView('joinEvent', { event: this.props.events.eventId, attendees: this.props.user })}
                      className="join-button"
                    >join</button></div></> : null
              }

              </div>

              <div className="text-center">
                {profile === user
                  ? <>
                    {/* <div> */}
                    <button
                      onClick={() => this.props.setView('updateEvent', { event: this.props.events })}
                      className="btn-event-card update-btn">update</button>

                    {/* </div> */}

                    {/* <div> */}
                    <button
                      onClick={this.handleDelete}
                      className="btn-event-card delete-btn ml-2">delete</button>
                    {/* </div> */}

                  </> : null}

              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
