import React from 'react';

export default class RecommendedResortDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resort: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/resort/${this.props.params.resortId}`)
      .then(res => res.json())
      .then(resort =>
        this.setState({
          resort: resort
        }))
      .catch(err => console.error(err));
  }

  handleClick(event) {

    this.props.setView('addEvent', { resortId: this.state.resort.resortId });

  }

  render() {

    if (!this.state.resort) {
      return null;
    }
    return (

      <div className="resort-detail">
        <div className="d-flex flex-wrap justify-content-center">
          <div className="mb-md-3 pt-2 col-lg-9">
            <h4><i className="fas fa-chevron-left py-md-3"
              onClick={() => this.props.setView('resortList', {})}></i> {this.state.resort.name}</h4>
            <p className="mt-n1 col-lg-9">{this.state.resort.address}</p>
          </div>
          <div className="resort-img">
            <img src={this.state.resort.imgUrl} alt="" className="img-detail mt-n3" />
          </div>
          <div className="d-flex justify-content-center resort-description pt-2">
            <p className="col-lg-9 mt-1">{this.state.resort.description}</p>
          </div>

        </div>
        <div className="text-center pt-3">
          <button className="btn-detail" onClick={this.handleClick}>Add to Event </button>
        </div>
      </div>

    );

  }
}
