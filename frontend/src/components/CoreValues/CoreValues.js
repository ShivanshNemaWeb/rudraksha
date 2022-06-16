import React from 'react'
import FooterPagePro from '../Footer/Footer'
import HomeHeading from '../HomeHeading/HomeHeading'
import Navbar from '../Navbar/Navbar'
import"./CoreValues.css"

function CoreValues() {
  return (
      <>
      <HomeHeading/>
      <Navbar/>
    <div className='BodyCV'>
            <div className='HeaderCV'>
                <img src={require('../../Images/cvnew.jpg')} />


            </div>
            <div className="HeadingCV">
                
            </div>

            <div className='MainCV1'>
                
                <p>We at RUDRAKSHA, have strict compliance to embrace a positive attitude towards performing our duties and take ownerships of the actions involved in it. This Foundation appreciates constructive initiatives from all employees and society and implication of the same in our projects, post due discussions of the facts and figures. We work with a definite motive of social service for different sections of the society with no discrimination to any class, creed, religion, sect, gender, color etc. This further trigger the compliance to our mentioned core values which are expected & mandated for each and every individual/entity associated with this Foundation.</p>
                
            </div>

            <div className='MainCV2'>

            <p>We have to take into consideration all of the 5 elements of our Core Values, while performing our duties on a daily basis while working in this Foundation. The concept will be as follows:</p>
                <ul>
                    <li><span className='CV2span1'>C</span>ourage :We all should have the Courage to provide best services without any dileusions to the needy, no matter how far or in difficult situations the community exists. We have to be courageous enough to be above the boundations of caste, creed, religion, sect, financial and non financial benefits while working for our society or on a larger scale Nation and Human race.</li>
                    <li><span className='CV2span2'>H</span>onesty : We all should be honest to the best of our knowledge, delivery and conduct while working in this Foundation, as these acts involve trusts of various individuals and entities who had invested in us with a prime motive of serving the society on their behalf. This parameter is the only way possible through which we would be able to maintain our dignity among ourselves and society for lifetime.</li>
                    <li><span className='CV2span3'>A</span>ccountability : We all should be able to stand up and take ownership of all actions of our Foundation done till date and in future. The ownership will set up a pattern for us as well as for the Society, Government, Stakeholders to provide us more enhanced options to serve the Nation and world. The overall success of any Organization is based a lot if it takes the ownership of all of its actions.</li>
                    <li><span className='CV2span4'>I</span>nnovative : We all should have the wisdom and should give our best for deriving more innovative modes of serving the Society and Nation as gone are the days of serving the community through old means of delivery. The call of the time is Technology and Data which has to be used properly and well in time through innovative ideas for serving our Philanthropic purpose.</li>
                    <li><span className='CV2span5'>R</span>esponsibility : We all should deliver our duties assigned to us at any given point of time with utmost responsibility. The outcome of discharging our duties as per desired form will pave a path towards a better future for our Society, Nation and World on a larger picture. There is no denying the fact that now time has come which has changed CSR from Corporate Social Responsibility to Common Social Responsibility, especially after Covid19.</li>
                </ul>
                     
            </div>

        </div>
        <FooterPagePro/>
        </>)
}

export default CoreValues
