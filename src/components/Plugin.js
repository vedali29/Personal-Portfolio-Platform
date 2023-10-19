import React from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import Home from './Home'
import {Router , Route, Routes} from 'react-router-dom'


export const Plugin = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="Dashboard" element={<Dashboard/>}/>
          <Route path="Login" element={<Login/>}/>
        </Routes>
    </Router>
  )
}
