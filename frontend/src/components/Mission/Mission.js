import React from 'react'
import FooterPagePro from '../Footer/Footer'
import HomeHeading from '../HomeHeading/HomeHeading'
import Navbar from '../Navbar/Navbar'
import './Mission.css'

function Mission() {
  return (
    <>
    <HomeHeading/>
    <Navbar/>
    
    <div className='BodyA3'>
            <div className='HeaderA3'>
                <img src={require('../../Images/MISION.jpg')} />
            </div>
            <div className='M1'>
                {/* <img src={require('../Images/MISSION.jpg')} /> */}
                {/* <p>The jobs in this Foundation requires good amount of public dealings and interactions hence individuals applying for the same are expected to be well known to Hindi, English and Punjabi. The initial work profile will be in Chandigarh and in due course will be expanded to various States of North INDIA. The general working hours in this Foundation will be between Monday to Friday 9:30 am – 6:00 pm during summer and 9:30 am to 5:30pm during winters. There will be working ours based on any activity if being scheduled on Saturdays or any other holidays as per the case may arise. The employee will be benefited with an additional off day within next 45 -60 days from the day he or she had made her contribution on any holiday or weekends. The working rules will be applicable on the domestic as well as International official tours. The travel expenses for official trips will be borne by our Foundation. Our Foundation puts an extra emphasis over Gender Equality parameters, hence we hire close to 50% female employees in our projects and in general. The actual number may vary depends upon meeting financial and other work profile constraints. The detailed eligibility requirements of all the above mentioned benefits and processes are listed in “Code of Conduct” column in this website. We might involve other organizations, NGOs in our project(s) based on the need arises as per the situation. The preference will be through well established organization on State, Center or National Level which have positive track records. A strict compliance and due diligence will be followed as setup by Government for philanthropy organizations.</p> */}
            <p>
            RUDRAKSHA has been setup with a definite and prime motive to serve the society and Nation in the simplest way by avoiding complexities, dependencies and any sort of illicit processes. We have a futuristic self sustainability approach towards the philanthropy activities where in we stress on value driven activities under the firm direction and support of experienced personals from Govt. as we as Private sectors from different sections o the society in order to achieve the inspiring though quite challengeable social welfare targets without any misleading or corrupt or fraudulent intents in any criteria. The respected Govt. help and directions will be the core of this organization in longer run with a prime motive of serving the society to the maximum possible extent within the norms of GOI as well as State Govt. There will be a lot of contribution from various individuals from Private sectors as without their inline thought process and wisdom visioning our mission of social service would have been into a big jeopardy. Our self sustainability model enriches us to give back to the society to the max what we had earned due to their respect and support towards us. We all with a positive intent and aggression looking forward to serve our Nation in the most creative and supportive way possible with strict adherence to compliance standards for a Non Profit Entity under Ministry of Corporate Affairs, GOI.


RUDRAKSHA WELFARE FOUNDATION

Home Disclamier Copyrights Cookie Contact

©Copyright © 2021 RUDRAKSHA- All rights reserved.


Download App

            </p>
            </div> 
            {/* <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Note:</strong> We don’t appreciate offers for money laundering, Fake CSR bills or Reports. Kindly refrain from contacting us for such activities. Your wisdom and support in this will be highly appreciated.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> */}

            
            </div>
            <FooterPagePro/>
            </>)
}

export default Mission