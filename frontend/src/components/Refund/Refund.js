import React from 'react'
import FooterPagePro from '../Footer/Footer'
import HomeHeading from '../HomeHeading/HomeHeading'
import Navbar from '../Navbar/Navbar'
import "./Refund.css"

function Refund() {
  return (
    <>
    <HomeHeading/>
    <Navbar/>
    <div className='BodyA2'>
            <div className='HeaderA5'>
                <img src={require('../../Images/refund.jpg')} />
            </div>
            <div className='R1'>
                {/* <img src={require('../Images/MISSION.jpg')} /> */}
                {/* <p>The jobs in this Foundation requires good amount of public dealings and interactions hence individuals applying for the same are expected to be well known to Hindi, English and Punjabi. The initial work profile will be in Chandigarh and in due course will be expanded to various States of North INDIA. The general working hours in this Foundation will be between Monday to Friday 9:30 am – 6:00 pm during summer and 9:30 am to 5:30pm during winters. There will be working ours based on any activity if being scheduled on Saturdays or any other holidays as per the case may arise. The employee will be benefited with an additional off day within next 45 -60 days from the day he or she had made her contribution on any holiday or weekends. The working rules will be applicable on the domestic as well as International official tours. The travel expenses for official trips will be borne by our Foundation. Our Foundation puts an extra emphasis over Gender Equality parameters, hence we hire close to 50% female employees in our projects and in general. The actual number may vary depends upon meeting financial and other work profile constraints. The detailed eligibility requirements of all the above mentioned benefits and processes are listed in “Code of Conduct” column in this website. We might involve other organizations, NGOs in our project(s) based on the need arises as per the situation. The preference will be through well established organization on State, Center or National Level which have positive track records. A strict compliance and due diligence will be followed as setup by Government for philanthropy organizations.</p> */}
            <p>We at RUDRAKSHA WELFAFRE FOUNDATION, appreciates and respects from the core of our heart the donations we receive from our precious and generous donors worldwide. We hereby follow a strict compliance in accepting donations through digital and paper banking & UPI applications modes as approved by Reserve Bank of India and fund raising guidelines approved by Ministry of Corporate Affairs for a Section 8 company. We don’t have the provision to refund the donations receive from the respected donors as there are several projects in which we as a team are committed and hence requires good amount of fund flow in order to process them diligently and support various weaker sections of the society. We hereby accept donations with a firm view point belief that respected donor’ are well in control and agrees to help us in assisting the various legitimate needs of the society on humanitarian grounds in various projects associated with our Foundation worldwide. In case at any point of time in future, any respected donor, post making donation changes his/her mind and decision, we would not be able to refund the amount donated, due to immediate commitment of the existing & collected funds in various executed, existing and proposed projects and other operational expenses. A detailed report of all the projects and expenditures conducted will be available online at our website in PDF format for downloading.Your support and understanding in this regard will be highly appreciated. We are grateful for reading this message.</p>
            </div>
            </div>
            <FooterPagePro/>
            </>
            )
}

export default Refund