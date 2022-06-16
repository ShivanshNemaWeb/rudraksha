import React from 'react'
import FooterPagePro from '../Footer/Footer'
import HomeHeading from '../HomeHeading/HomeHeading'
import Navbar from '../Navbar/Navbar'
import './Vision.css'
import "./vision.scss"
function Vision() {
  return (
    <>
    
    <HomeHeading/>
    <Navbar/>
    <div className='BodyA1'>
    <div className='HeaderA1'>
        <img src={require('../../Images/vision.jpg')} />
    </div>
    <div className='V1'>
    <p>We at RUDRAKSHA have a strong belief to bestow towards our Society and Nation to the best of our ability and intent in order to help humanity in all the weaker sections of their life spans. The entire objective of this Foundation is to help the under privileged and needy souls irrespective of their caste, creed, religion etc. The organization proudly has been ensemble with a firm belief in LORD SHIVA, and is pledged towards serving the Nation and Humanity in all the possible ways within the strict compliance of Law and Ethics towards the growth of our first and foremost Nation INDIA. The general observation towards Religion now-a-days have changed manifolds and this is just an attempt towards making all of us understand the fact that Religion, can & should be used positively in order to make day to day lives better than bitter on this planet. We are looking towards all those precious helping souls from this planet to contribute their efforts towards making our planet a superior place to live in liaison with the UN Sustainable Development Goals. A strong belief within us makes us strive to look out for all those possible means through which one can unite the human race towards the achievement of all those stiff targets which have to be achieved at any cost sooner by human race as a whole before it surpasses the mark of irreparable damages as per all the social evolution vectors guided by UN SDG for our society and Nation.</p>
            </div>
     <div className='HeaderA2 visionimg zoom'>
        <figure><img src={require('../../Images/vision_pic.jpg')} /></figure>
    </div>

            </div>
            <FooterPagePro/>
  </>
  )
}

export default Vision
 {/* <div className='V2'>
                  <h1><u>Our Vision Statement</u></h1>
            </div>

            {/* <div className='V3'>
                  <p>"The Best Aggressive Activity is doing something Phillanthrophically Creative which others believe One can’t do ”</p>
            </div> */}
            
            {/* <div class="fade-in-text">
                 <h3>"The Best Aggressive Activity is doing something Phillanthrophically Creative which others believe One can’t do ”</h3>
            </div> */} 