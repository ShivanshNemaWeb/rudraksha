import React from 'react'
import FooterPagePro from '../Footer/Footer'
import HomeHeading from '../HomeHeading/HomeHeading'
import Navbar from '../Navbar/Navbar'
import "./Management.css"

function Management() {
  return (
      <>
      <HomeHeading/>
      <Navbar/>
    <div className='BodyManage'>
            <div className='HeaderManage'>
                <img src={require('../../Images/manage.jpg')} />


            </div>

            <div className=' container MainManage1 '>
                <div className='MMdiv1'>

                <img className='Direct1' src={require('../../Images/Director.jpg')} />
                <h2>Director</h2>

                </div>
                <div className='MMdiv2'>
                    <div>
                    <h2>Aacharya Yogesh Kaushik</h2>
                    <p>AACHARYA Yogesh Kumar Kaushik, hails from Haryana and holds a Masters Degree in Vedic Astrology, Karam Kaand, Vastu & HINDU Dharma Shastra in Sanskrit. He has a rich experience of 18+ years in Astrology, Vastu & HINDU Dharma Shastra. He is a shareholder Director in RUDRAKSHA WELFARE FOUNDATION since FY 2020-21 onwards.</p>
                    </div>
                    <div className='ManageImg'>
                    <img src={require('../../Images/manage1.png')} />
                    <img src={require('../../Images/manage2.png')} />
                    <img src={require('../../Images/manage3.jpg')} />

                    </div>
                   
                </div>

            </div>



            <div className='container MainManage2 '>
                <div className='MMdiv1'>

                <img className='Direct2' src={require('../../Images/AtulDevArora.jpeg')}  />
                <h2>Founder & MD</h2>
                

                </div>
                <div>
                    <div>
                    <h2>Mr. Atul Dev Arora</h2>
                    <p>Atul Dev Arora, is a localite from Chandigarh and holds Masters in IT, Cosmic Science, Social Work, CSR & DM. He has rich experience of 17+ years in National & International Projects of Ministry of Corporate Affairs, Regulatory Bodies, Government Organisations & Private Banks. He is the Founder & MD in RUDRAKSHA WELFARE FOUNDATION since FY 2019-20 onwards.</p>
                    </div>
                    <div className='ManageImg'>
                    <img src={require('../../Images/manage4.jpg')} />
                    <img src={require('../../Images/manage5.jpg')} />
                    <img src={require('../../Images/manage6.jpg')} />

                    </div>
                   
                </div>

            </div>

        </div>
        <FooterPagePro/>
        </> )
}

export default Management
