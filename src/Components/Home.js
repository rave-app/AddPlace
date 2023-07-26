import React, { useEffect, useState } from 'react'
import { callAPI } from '../Functions/useAPI'
import PlaceRow from './PlaceRow'
import { Link } from 'react-router-dom'

const Home = ({token,id}) => {
  const [places,setPlaces] = useState(null)
  const getPlaces = async() => {
    const body = JSON.stringify({
      token:token,
      id:id,
    })
    try {
    const json = await callAPI("https://rave-app-0dc38f75026c.herokuapp.com/allplaces","PUT",body)
    if(json.error === -1) {
      const newArr = [...json.places]
      newArr.sort((a,b) => {
        return a.name.localeCompare(b.name)
      })
      setPlaces(newArr)
    }
    console.log(json)
    } catch(error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getPlaces()
  },[])
  return (
    <div>
      <div className="header">
        <h2 className="header-text">
            Rave
        </h2>
        <div className="header-links">
          <Link className="header-link" to="/">
            Home
          </Link>
          <Link className="header-link" to="/addplace">
            Add Place
          </Link>
          <Link className="header-link" to="/logout">
            Log Out
          </Link>
        </div>
        </div>
      {places && <h2 style={{color:"white",textAlign:"center"}}>{places.length} places and counting</h2>}
      {places && places.map((place) => <PlaceRow img={place.profile_picture} name={place.name} address={place.address}/>)}
    </div>
  )
}

export default Home