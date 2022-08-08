import React from 'react'
import'./HomeHead.css'

function HomeHeading() {
  return (
    <div className='main'>
    <div class="upperlogo">
      <img src={require('../../Images/Upperlogo1.jpeg')
                } class="img-fluid ulogoimage" alt=""/>
      <img src={require('../../Images/Upperlogo2.jpeg')
                } class="img-fluid ulogoimage" alt=""/>
    </div>
      
    </div>
  )
}

export default HomeHeading
