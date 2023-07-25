import React from 'react'

const PlaceRow = ({img,name,address}) => {
  return (
    <div className="placerow-container">
        <div className="placerow-img-container">
            <img src={img} className="placerow-img"/>
        </div>
        <div className="placerow-name-container">
            <p className="placerow-name">{name}</p>
        </div>
        <div className="placerow-name-container">
            <p className="placerow-name">{address}</p>
        </div>
    </div>
  )
}

export default PlaceRow