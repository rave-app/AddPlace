import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { callAPI } from "../Functions/useAPI"

const AddPlace = ({token,id}) => {
    const [state,setState] = useState({
        name: null,
        url: null,
        website: null,
        type: "restaurant",
        hours: [null,null,null,null,null,null,null],
        pendingHours: null,
        address : null,
    })
    const setURL = (url) => {
        const newState = {...state}
        newState.url = url
        setState(newState)
    }
    const attemptAutoFill = async() => {
        if(!state.url) {
            return 
        }
        const body = JSON.stringify({
            id: id,
          
            token: token,
            url: state.url
        })
        try {
            const json = await callAPI("https://rave-app-0dc38f75026c.herokuapp.com/scrapeplace","PUT",body)
            if(json.error === -1){
                const newState = {...state}
                newState.name = json.name
                newState.address = json.address
                newState.website = json.website
                if(json.hours.length === 7) {
                    newState.hours = json.hours
                } else {
                    newState.pendingHours = json.hours
                }
                setState(newState)
            }
        } catch(error) {
            console.error(error)
        }
    }
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
        <form className="add-form">
            <div className="add-flex-row">
            <input placeholder="URL" className="add-input" onInput={(e) => setURL(e.target.value)}/>
            <button className="add-btn" onClick={attemptAutoFill}>Auto-Fill</button>
            </div>
            <input placeholder="Name" value={state.name ? state.name : null} className="add-input"/>
            <input placeholder="Address" value={state.address ? state.address : null} className="add-input"/>
            <input placeholder="Website" value={state.website ? state.website : null} className="add-input"/>
            <div className="add-flex-row">
            <input placeholder="Monday Hours" value={state.hours[0] ? state.hours[0] : null} className="add-input"/>
            <input placeholder="Monday Hours 2" className="add-input"/>
            </div>
            <div className="add-flex-row">
            <input placeholder="Tuesday Hours" value={state.hours[1] ? state.hours[1] : null} className="add-input"/>
            <input placeholder="Tuesday Hours 2" className="add-input"/>
            </div>
            <div className="add-flex-row">
            <input placeholder="Wednesday Hours" value={state.hours[2] ? state.hours[2] : null} className="add-input"/>
            <input placeholder="Wednesday Hours 2" className="add-input"/>
            </div>
            <div className="add-flex-row">
            <input placeholder="Thursday Hours" value={state.hours[3] ? state.hours[3] : null} className="add-input"/>
            <input placeholder="Thursday Hours 2" className="add-input"/>
            </div>
            <div className="add-flex-row">
            <input placeholder="Friday Hours" value={state.hours[4] ? state.hours[4] : null} className="add-input"/>
            <input placeholder="Friday Hours 2" className="add-input"/>
            </div>
            <div className="add-flex-row">
            <input placeholder="Saturday Hours" value={state.hours[5] ? state.hours[5] : null} className="add-input"/>
            <input placeholder="Saturday Hours 2" className="add-input"/>
            </div>
            <div className="add-flex-row">
            <input placeholder="Sunday Hours" value={state.hours[6] ? state.hours[6] : null} className="add-input"/>
            <input placeholder="Sunday Hours 2" className="add-input"/>
            </div>
            <select defaultValue={"restaurant"}>
                <option value="restaurant">restaurant</option>
                <option value="bar">bar</option>
                <option value="club">club</option>
            </select>
        </form>
    </div>
  )
}

export default AddPlace