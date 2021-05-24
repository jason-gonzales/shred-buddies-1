import React from 'react';

// import MyContext from './my-context';

export default class EventListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      event: null,
      guests: null,
      attend: null,
      attendees: []
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.getAttendees = this.getAttendees.bind(this);

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

  componentDidMount() {

    this.getAttendees();

  }

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

      for (let i = 0; i < a.length; i++) {
        if (eventCard === a[i].eventId) {
          guestPic.push(a[i].imgUrl);

        }
      }

    }

    const guestPicture = guestPic.map((join, index) =>
      <img src={join} key={index} className="attending-pic" />);

    const profile = this.props.events.profileId;
    const user = this.props.user;
    const { events } = this.props;
    // eslint-disable-next-line
    const start = new Date(events.start.replace(/-/g, '\/').replace(/T.+/, ''));
    // eslint-disable-next-line
    const end = new Date(events.end.replace(/-/g, '\/').replace(/T.+/, ''));

    const joinPics = [];

    if (guestPicture) {

      for (let i = 0; i < guestPicture.length; i++) {
        joinPics.push(guestPicture[i].props.src);
      }
    }

    return (
      <>

        <div className="d-flex flex-column event-size">
          <div className="card bg-dark text-white mb-3 mx-md-2">
            <img className="event-img" src={this.props.events.resortImage} alt="Card image" />
            <div className="d-flex flex-column card-img-overlay">
              <div className=""> {/* onClick={this.handleClick}> */}
                <div className="d-flex">
                  <h3 className="card-title">{this.props.events.resortName}</h3>
                  <img className="host-pic ml-auto"
                    src={this.props.events.profileImage}
                    alt="shredder-host" />
                </div>
                <p className="pt-2">Hosted by <b>{this.props.events.profileName}</b></p>
                <p className="mt-n2">{start.toDateString()} - {end.toDateString()}</p>

                <div>attending: <span className="pl-2">
                  {this.props.user ? <>
                    <img
                      className="attending-pic"
                      src={this.props.events.profileImage}
                      alt={this.props.events.profileName} /></> : null}

                  {guestPicture}
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

                </span>
                </div>
              </div>
              <div className="mt-2 pt-4"> {
                profile !== user ? <>
                  <div className="text-center">
                    <button
                      onClick={() => this.props.setView('joinEvent',
                        {
                          userName: this.props.userName,
                          eventName: this.props.events.resortName,
                          event: this.props.events.eventId,
                          attendees: this.props.user,
                          events: this.props.events,
                          guest: this.props.guest,
                          guestPicture: joinPics,
                          userPic: this.props.userPic

                        })}
                      className="join-button"
                    >details</button></div></> : null
              }

              </div>

              <div className="text-center">
                {profile === user
                  ? <>

                    <button
                      onClick={() => this.props.setView('updateEvent', { event: this.props.events })}
                      className="btn-event-card update-btn">update</button>

                    <button
                      onClick={this.handleDelete}
                      className="btn-event-card delete-btn ml-2">delete</button>

                  </> : null}

              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
