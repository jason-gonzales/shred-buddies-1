import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.getUserProfile = this.getUserProfile.bind(this);
  }

  getUserProfile() {
    fetch(`/api/profile/${this.props.params.profileId}`)
      .then(res => res.json())
      .then(data => {
        this.props.addUser(data);

      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getUserProfile();

  }

  render() {

    if (this.props.profile) {
      const { name, email, skill, imgUrl, description } = this.props.profile;
      return (
        <div className="profile-page">
          <h2 className="ml-2 my-3 text-center">Profile</h2>
          <div className="mx-2 profile-info row d-flex align-items-end justify-content-center">
            <div className="col-lg-11 content-container mb-3 mt-5 position-relative">
              <div className="pic-box row mx-auto justify-content-center position-relative mb-2">
                <img className="profile-pic m-auto"
                  src={imgUrl} alt={name} />
              </div>
              <div className="name-box row justify-content-start flex-column position-relative">
                <h2 className="m-auto text-center">{name}</h2>
                <p className="email text-center">{email}</p>
              </div>
              <div className="extra-box pt-3 col-11 m-auto position-relative col-lg-7">
                <h5 className="skill">Skill Level</h5>
                <h5 className="level">{skill}</h5>
                <div>
                  <h5 className="pt-2 about">About</h5>
                  <h5 className="description">{description}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Profile;
