import React from 'react';
// import Profile from './profile';

export default class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      skill: '',
      imgUrl: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const input = event.target.name;
    const value = event.target.value;
    const newState = {};
    newState[input] = value;
    this.setState(newState);

  }

  handleClick(event) {
    event.preventDefault();
    this.props.createProfile(this.state);
    if (this.props.profile) {
      this.props.setView('login', { profileId: this.props.profile });
    //   this.props.setView('login');
    }

  }

  render() {

    return (
      <div className="create-form">
        <header className="create-header d-flex align-items-center">
          <h2 onClick={() => this.props.setView('home', {})} className="m-auto col-11 col-lg-8 col-xl-7 head-title"><i className="fas fa-chevron-left"></i></h2></header>

        <form className="container col-11 col-lg-8 col-xl-7">
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">
              <h3 className="mt-2">Create Profile</h3>
            </label>
            <input onChange={this.handleChange}
              value={this.state.name}
              name="name"
              type="text"
              className="form-control mb-4"
              id="formGroupExampleInput"
              placeholder="name" />
            <input onChange={this.handleChange}
              value={this.state.email}
              name="email" type="email"
              className="form-control mb-4 create-email"
              id="email-id" placeholder="email" />
            <select onChange={this.handleChange}
              value={this.state.skill}
              name="skill"
              className="form-control mb-4">
              <option>skill level</option>
              <option>beginner</option>
              <option>intermediate</option>
              <option>expert</option>
            </select>
            <textarea
              onChange={this.handleChange}
              value={this.state.description}
              name="description"
              className="form-control mb-4"
              placeholder="description of yourself"
              rows="7"></textarea>
            <input
              onChange={this.handleChange}
              value={this.state.imgUrl}
              name="imgUrl"
              className="form-control file-path validate mb-4"
              type="text"
              placeholder="upload profile picture" />
            <div className="text-center">
              <button
                onClick={this.handleClick}
                className="btn-detail">create profile</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
