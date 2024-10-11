import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Data from './Data'
import "../index.css"



const AddToDrive = () => {
  return (
    <div>
     <Header/>
     <div className='app_body'>
     <Sidebar/>
     <Data/> 
     </div>
     
    </div>
  )
}

export default AddToDrive