import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => this.setState({
        profiles: data
      }))
      .catch(err => console.error(err));

  }

  handleChange(event) {
    const index = event.target.selectedIndex;
    const selected = event.target.childNodes[index];
    const id = selected.getAttribute('profileid');
    // this.props.addUser({
    //   profile: event.target.value,
    //   profileId: parseInt(id)
    // });

    this.props.setView('profile', { profileId: id });

  }

  render() {

    return (
      <div className="login col">
        <h2 className="head-title d-flex justify-content-center mt-5 pt-5">Shred Buddies</h2>
        <div className="d-flex justify-content-center align-items-center pt-4">
          <select className="form-control-lg col-md-7 mt-3" onChange={this.handleChange} id={this.state.users} >
            <option className="col-9">Select User</option>
            {/* <option value="145" userId="1">Mark Gallardo</option>
            <option value="144" userId="2">Jason Gonzales</option> */}
            {this.state.profiles.map(profile => {

              return (
                <option key={profile.profileId} profileid={profile.profileId}>{profile.name}</option>
              );
            })}

          </select>
        </div>
      </div>
    );
  }
}

export default Login;
