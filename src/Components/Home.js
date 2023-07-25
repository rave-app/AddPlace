import React, { useEffect, useState } from 'react'
import { callAPI } from '../Functions/useAPI'
import PlaceRow from './PlaceRow'

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
      setPlaces(json.places)
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
      {places && places.map((place) => <PlaceRow img={place.profile_picture} name={place.name} address={place.address}/>)}
    </div>
  )
}

export default Home