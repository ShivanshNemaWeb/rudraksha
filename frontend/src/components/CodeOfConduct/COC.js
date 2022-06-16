import React from 'react'
import FooterPagePro from '../Footer/Footer'
import HomeHeading from '../HomeHeading/HomeHeading'
import Navbar from '../Navbar/Navbar'
import "./COC.css"

function COC() {
  return (
    <>
    <HomeHeading/>
    <Navbar/>
    <div className='BodyCoc'>
        <div className='HeaderCoc'>
                <img src={require('../../Images/coc.jpg')} />


        </div>
        <div className='MainCoc'>

        <iframe src="" width="100%" height="500px">
            </iframe>


        </div>

      
    </div>
    <FooterPagePro/>
    </>)
}

export default COC
