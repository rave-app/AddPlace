import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { callAPI } from "../Functions/useAPI"
import Resizer from "react-image-file-resizer";

const resizeFile = (file,setImage) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      100,
      100,
      "JPEG",
      50,
      0,
      (uri) => {
        setImage(uri);
        resolve(uri);
      },
      "base64",
      100,
      100,
    );
  });

const AddPlace = ({token,id}) => {
    const [state,setState] = useState({
        name: null,
        url: null,
        website: null,
        type: "restaurant",
        hours: [null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        pendingHours: null,
        address : null,
        coords: [null,null]
    })
    const navigate = useNavigate()
    const attemptAddPlace = async() => {
        const newHours = []
        for(let i=0; i<7; i++) {
            if(state.hours[i] && state.hours[i+7]) {
                newHours.push(`${state.hours[i]}&${state.hours[i+7]}`)
            } else {
                newHours.push(`${state.hours[i]}`)
            }
        }
        const body = JSON.stringify({
            token:token,
            id:id,
            address:state.address,
            profile_picture:base64,
            hours:newHours,
            type:state.type,
            website:state.website,
            name:state.name
        })
        const json = await callAPI("https://rave-app-0dc38f75026c.herokuapp.com/addplace","POST",body)
        if(json.error === -1) {
            navigate("/")
        }
    }
    const [image,setImage] = useState(null)
    const [base64,setBase64] = useState(null)
    const [file,setFile] = useState(null)
    const loadFile = async() => {
        if(file) {
            let newB64 = await resizeFile(file,setImage)
            newB64 = newB64.substr(newB64.indexOf(",")+1)
            setBase64(newB64);
        }
    }
    const setName = (name) => {
        const newState = {...state}
        newState.name = name
        setState(newState)
    }
    const setWebsite = (site) => {
        const newState = {...state}
        newState.website = site
        setState(newState)
    }
    const setAddress = (addy) => {
            const newState = {...state}
            newState.address = addy
            setState(newState)
    }
    const setCoords = (coord,index) => {
        const newState = {...state}
        newState.coords[index] = coord
        setState(newState)
    }
    useEffect(() => {
        loadFile()
    },[file])
    const setURL = (url) => {
        const newState = {...state}
        newState.url = url
        setState(newState)
    }
    const setHours = (hours,index) => {
        const newState = {...state}
        newState.hours[index] = hours
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
                for(let i=0; i<Math.min(json.hours.length,14); i++) {
                    newState.hours[i] = json.hours[i]
                }
                if(json.hours.length > 7) {
                    newState.warning = "More than 7 days of hours provided by yelp. Restaurant likely opens for lunch and dinner on certain days -- refer to website."
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
            {image && <img src={image}/>}
            </div>
            <div className="add-flex-row">
            <input className="add-select" type="file" accept=".jpeg, .png, .jpg" onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <div className="add-flex-row">
            <input placeholder="URL" className="add-input" onInput={(e) => setURL(e.target.value)}/>
            <button className="add-btn" onClick={attemptAutoFill}>Auto-Fill</button>
            </div>
            <input placeholder="Name" onInput={(e) => setName(e.target.value)} value={state.name ? state.name : null} className="add-input"/>
            <input placeholder="Address" onInput={(e) => setAddress(e.target.value)} value={state.address ? state.address : null} className="add-input"/>
            <input placeholder="Website" onInput={(e) => setWebsite(e.target.value)} value={state.website ? state.website : null} className="add-input"/>
            {state.warning && <p className="add-warning">{state.warning}</p>}
            <div className="add-flex-row">
            <input placeholder="Monday Hours" onInput={(e) => setHours(e.target.value,0)} value={state.hours[0] ? state.hours[0] : null} className="add-input"/>
            <input placeholder="Monday Hours 2" onInput={(e) => setHours(e.target.value,7)} value={state.hours[7] ? state.hours[7] : null} className="add-input"/>
            </div>
            <div className="add-flex-row">
            <input placeholder="Tuesday Hours" onInput={(e) => setHours(e.target.value,1)} value={state.hours[1] ? state.hours[1] : null} className="add-input"/>
            <input placeholder="Tuesday Hours 2" onInput={(e) => setHours(e.target.value,8)} value={state.hours[8] ? state.hours[8] : null} className="add-input"/>
            </div>
            <div className="add-flex-row">
            <input placeholder="Wednesday Hours" onInput={(e) => setHours(e.target.value,2)} value={state.hours[2] ? state.hours[2] : null} className="add-input"/>
            <input placeholder="Wednesday Hours 2" onInput={(e) => setHours(e.target.value,9)} value={state.hours[9] ? state.hours[9] : null} className="add-input"/>
            </div>
            <div className="add-flex-row">
            <input placeholder="Thursday Hours" onInput={(e) => setHours(e.target.value,3)} value={state.hours[3] ? state.hours[3] : null} className="add-input"/>
            <input placeholder="Thursday Hours 2" onInput={(e) => setHours(e.target.value,10)} value={state.hours[10] ? state.hours[10] : null} className="add-input"/>
            </div>
            <div className="add-flex-row">
            <input placeholder="Friday Hours" onInput={(e) => setHours(e.target.value,4)} value={state.hours[4] ? state.hours[4] : null} className="add-input"/>
            <input placeholder="Friday Hours 2" onInput={(e) => setHours(e.target.value,11)} value={state.hours[11] ? state.hours[11] : null} className="add-input"/>
            </div>
            <div className="add-flex-row">
            <input placeholder="Saturday Hours" onInput={(e) => setHours(e.target.value,5)} value={state.hours[5] ? state.hours[5] : null} className="add-input"/>
            <input placeholder="Saturday Hours 2" onInput={(e) => setHours(e.target.value,12)} value={state.hours[12] ? state.hours[12] : null} className="add-input"/>
            </div>
            <div className="add-flex-row">
            <input placeholder="Sunday Hours" onInput={(e) => setHours(e.target.value,6)} value={state.hours[6] ? state.hours[6] : null} className="add-input"/>
            <input placeholder="Sunday Hours 2" onInput={(e) => setHours(e.target.value,13)} value={state.hours[13] ? state.hours[13] : null} className="add-input"/>
            </div>
            <select defaultValue={"restaurant"} className="add-select">
                <option value="restaurant">restaurant</option>
                <option value="bar">bar</option>
                <option value="club">club</option>
            </select>
            <div className="add-flex-row">
            <input placeholder="Latitude" onInput={(e) => setCoords(e.target.value,0)} value={state.coords[0] ? state.coords[0] : null} className="add-input"/>
            <input placeholder="Longitude" onInput={(e) => setCoords(e.target.value,1)} value={state.coords[1] ? state.coords[1] : null} className="add-input"/>
            </div>
            <button className="login-btn" onClick={() => attemptAddPlace()}>Add Place</button>
        </form>
    </div>
  )
}

export default AddPlace