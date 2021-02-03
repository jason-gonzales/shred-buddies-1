import React from 'react';

export default function ResortListItem(props) {

  function handleClick() {
    props.setView('resortDetails', { resortId: props.resorts.resortId });
  }
  return (

    <div className="card resort-card mb-3 mx-lg-2 mb-xl-5"
      onClick={handleClick} >
      <img className="card-img-top resort-list-img rounded-top" src={props.resorts.imgUrl} alt="Card image cap" />
      <div className="card-body py-2">
        <h5 className="card-title"> {props.resorts.name}</h5>
        <p className="card-text">{props.resorts.address}</p>
      </div>
    </div>

  );

}
