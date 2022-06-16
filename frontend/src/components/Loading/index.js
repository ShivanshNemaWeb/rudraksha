import React from 'react'
import './index.css'
function Loading() {
  return (
    <div className='Five'>
    <div className="loader">
      
        <span></span>
        <span></span>
        
        <span></span>
        
        <span></span>
       
    </div>
    <img src={require('../../Images/LogoLoad.jpeg')
                } ></img>
    </div>
    
  )
}

export default Loading