import React, { useState } from 'react'
import { callAPI } from '../Functions/useAPI'
import { useNavigate } from 'react-router-dom'

const Login = ({setAuth}) => {
    const navigate = useNavigate()
    const [state,setState] = useState({})
    const setUsername = (username) => {
        const newState = {...state}
        newState.username = username
        setState(newState)
    }
    const setPassword = (password) => {
        const newState = {...state}
        newState.password = password
        setState(newState)
    }
    const setError = (error) => {
        const newState = {...state}
        newState.error = error
        setState(newState)
    }
    const attemptLogin = async() => {
        if(!state.username || !state.password) {
            console.log("nice!")
            setError("Please enter a username and password")
            return
        }
        const body = JSON.stringify({username:state.username,password:state.password})
        try {
            const json = await callAPI("https://rave-app-0dc38f75026c.herokuapp.com/adminlogin","PUT",body)
            console.log(json)
            if(json.error === -1) {
                setAuth(json.token,json.id)
                navigate("/")
            }
        } catch(error) {
            console.error(error)
        }
    }
  return (
    <div className="login-container">
        <form className="login-form">
            <input className="login-input" placeholder="Username" type="text" onInput={(e) => setUsername(e.target.value)}/>
            <input className="login-input" placeholder="Password" type="password" onInput={(e) => setPassword(e.target.value)}/>
            <button className="login-btn" onClick={attemptLogin}>Log In</button>
        </form>
        {state.error && <p className="login-error">{state.error}</p>}
    </div>
  )
}

export default Login