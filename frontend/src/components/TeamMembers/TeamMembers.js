import React from 'react'
import './TeamMembers.css'
import video from "../../Video/ANIMATION.mp4"

function TeamMembers() {
  return (
    <div className='MainTeam'>
      <video width="100%" height="600" autoPlay muted controls loop>
        <source src={video} type="video/mp4"/>
         
          </video>

        </div>
        )
}

        export default TeamMembers
