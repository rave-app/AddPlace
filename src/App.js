import React, { useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';

const App = () => {
  const [state,setState] = useState({
    token: localStorage.getItem("token"),
    id: localStorage.getItem("id")
  }
    )
  const setAuth = (token,id) => {
    const newState = {...state}
    localStorage.setItem("token",token)
    localStorage.setItem("id",id)
    newState.token = token
    newState.id = id
    setState(newState)
  }
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={state.token ? <Home token={state.token} id={state.id}/> : <Navigate to="/login"/>}/>
        <Route path="/login" element={<Login setAuth={setAuth}/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App