import React from 'react';
import EventList from './event-list';
import Header from './header';
import Profile from './profile';
import ResortList from './resort-list';
import CreateProfile from './create-profile';
import Homepage from './home-page';
import Notification from './notification-page';
import RecommendedResortDetail from './recommended-resort-detail';
import AddEvent from './add-event';
import EventDetails from './event-details';
import HostPage from './host-page';
import Footer from './footer';
import Login from './log-in';
import UpdateEvent from './update-event';
import JoinEvent from './join-event';
// import MyContext from './my-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {

        name: 'home',
        params: {}
      },
      profile: null,
      user: null,
      event: null,
      resort: null,
      host: null,
      attend: null,
      guest: null
    };
    this.setView = this.setView.bind(this);
    // this.setUser = this.setUser.bind(this);
    this.createProfile = this.createProfile.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.addUser = this.addUser.bind(this);
    // this.isAttending = this.isAttending.bind(this);
    this.addGuest = this.addGuest.bind(this);
  }

  addUser(userName) {
    this.setState({
      profile: userName,
      user: userName
    });
  }

  addGuest(guestName) {

    this.setState({
      guest: guestName

    });

  }

  // setUser(user) {
  //   this.setState({
  //     user: user
  //   });
  // }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  createProfile(object) {
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)

    };
    fetch('/api/profile', requestOption)
      .then(result => result.json())
      .then(data => this.setState({
        view: { name: 'login', params: {} }

      }))
      .catch(err => console.error(err));
  }

  createEvent(object) {
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)
    };

    fetch(`/api/event/${this.state.user.profileId}`, requestOption)
      .then(result => result.json())
      .then(data => this.setState({
        view: { name: 'host', params: {} },
        event: data.eventId,
        resort: data.resortId,
        host: data,
        user: data
      }))
      .catch(err => console.error(err));
  }

  // isAttending(object) {
  //   const requestOption = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(object)
  //   };

  //   fetch(`/api/attendees/${this.state.user.profileId}`, requestOption)
  //     .then(result => result.json())
  //     .then(data => this.setState({
  //       attend: data
  //     }))
  //     .catch(err => console.error(err));
  // }

  deleteEvent(object) {

    const eventId = object;
    fetch('/api/event/' + eventId, {
      method: 'DELETE'
    })
      .then(res => {
        this.getEvents();
      })

      .catch(err => console.error(err));
  }

  render() {

    // console.log(this.state.attend);
    // if (!this.state.attend) {
    //   console.log(this.state.attend);
    // }

    let view = <>

      <Header setView={this.setView} />
      <AddEvent
        setView={this.setView}
        createEvent={this.createEvent}
        resort={this.state.resort}
        params={this.state.view.params} />
    </>;

    if (this.state.view.name === 'home') {
      view = <Homepage setView={this.setView} />;
    } else if (this.state.view.name === 'create') {
      view = <CreateProfile
        setView={this.setView}
        createProfile={this.createProfile} />;
    } else if (this.state.view.name === 'profile') {
      view =
        <>
          <Header setView={this.setView} />
          <Profile
            setView={this.setView}
            params={this.state.view.params}
            profile={this.state.profile}
            addUser={this.addUser}
            // setUser={this.setUser}
            getUserProfile={this.getUserProfile} />
          <Footer setView={this.setView} />
        </>;
    } else if (this.state.view.name === 'main') {
      view =
        <>
          <Header setView={this.setView} />
          <EventList
            addGuest={this.addGuest}
            deleteEvent={this.deleteEvent}
            setView={this.setView}
            user={this.state.user}
            guest={this.state.guest}
            isAttending={this.isAttending}
          />
          <Footer setView={this.setView} />

        </>;

    } else if (this.state.view.name === 'resortList') {
      view =
        <>
          <Header setView={this.setView} />
          <ResortList
            setView={this.setView}
            params={this.state.view.params} />
          <Footer setView={this.setView} />
        </>;

    } else if (this.state.view.name === 'resortDetails') {
      view =
        <>
          <Header setView={this.setView} />
          <RecommendedResortDetail
            setView={this.setView}
            params={this.state.view.params} />
          <Footer setView={this.setView} />
        </>;
    } else if (this.state.view.name === 'addEvent') {
      view =
        <>
          <Header setView={this.setView} />
          <AddEvent
            isAttending={this.isAttending}
            setView={this.setView}
            createEvent={this.createEvent}
            resort={this.state.resort}
            params={this.state.view.params} />
          <Footer setView={this.setView} />
        </>;
    } else if (this.state.view.name === 'updateEvent') {
      view =
        <>
          <Header setView={this.setView} />
          <UpdateEvent
            isAttending={this.isAttending}
            setView={this.setView}
            createEvent={this.createEvent}
            resort={this.state.resort}
            params={this.state.view.params} />
          <Footer setView={this.setView} />
        </>;
    } else if (this.state.view.name === 'joinEvent') {
      view =
        <>
          <JoinEvent
            setView={this.setView}
            params={this.state.view.params} />
        </>;
    } else if (this.state.view.name === 'notification') {
      view =
        <>
          <Header setView={this.setView} />
          <Notification setView={this.setView} />
          <Footer setView={this.setView} />
        </>;
    } else if (this.state.view.name === 'eventDetails') {
      view =
        <>
          <Header setView={this.setView} />
          <EventDetails
            isAttending={this.isAttending}
            setView={this.setView}
            params={this.state.view.params} />
          <Footer setView={this.setView} />
        </>;
    } else if (this.state.view.name === 'host') {
      view =
        <>
          <Header setView={this.setView} />
          <HostPage setView={this.setView}
            params={this.state.view.params}
            event={this.state.host}
            deleteEvent={this.deleteEvent} />
          <Footer setView={this.setView} />
        </>;

    } else if (this.state.view.name === 'login') {
      view =
        <>
          <Login setView={this.setView}
            addUser={this.addUser}
            createProfile={this.createProfile}
            params={this.state.view} />
        </>;
    }

    return (
      <>
        {/* <MyContext.Provider value={this.state.guest}> */}
        {view}
        {/* </MyContext.Provider> */}
      </>
    );
  }
}
