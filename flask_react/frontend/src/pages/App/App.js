import React from 'react'
import { useSelector } from "react-redux"
import Dashboard from '../Dashboard/Dashboard'
import "./App.scss"


const App = (props) => {
  const loading = useSelector((state) => state.dashboard.isFetching)

  if (loading) {
    return <div>Loading...</div>
  } 
  
  return (
   <div className="App">      
		<Dashboard/>
   </div>
 )
  
}

export default App