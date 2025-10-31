import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'  
import Homepage from './Pages/Homepage'
import { Outlet } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import { useAuthStore } from './store/authStore.js'

const App = () => {
  const {fetchUser, fetchingUser,user}=useAuthStore()

  useEffect(()=>{
    fetchUser()
  },[fetchUser])
  if(fetchingUser){
    return <div className='text-white'>Loading</div>
  }
  
  return (
    <div>
      <Toaster/>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App
