import React from 'react'

import EndIcons from '../EndIcons/EndIcons';

// import Count from './components/EndNumbers/Count';
// import EndNumbers from './components/EndNumbers/EndNumbers';
import FooterPagePro from '../Footer/Footer';
import Homeactions from '../Homeactions/Homeactions';
import HomeCarousel from '../HomeCarousel/HomeCarousel';
import HomeEnd from '../HomeEnd/HomeEnd';
import HomeHeading from '../HomeHeading/HomeHeading';
import Homepara from '../Homepara/Homepara';
import Homepro from '../Homepro/Homepro';
// import Loading from './components/Loading/Loading';
import Navbar from '../Navbar/Navbar';
import UNS from '../UNS/UNS';
import Loading from '../Loading/index';
import {useState, useEffect} from 'react';


// import Count2 from './components/Count2/Count2';
import Download from '../Downloadapp/Download';
import TeamMembers from '../TeamMembers/TeamMembers';

function HomePage() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2500);
    }, []);
  return (
    
    <>
    {loading ? (<Loading />) :
                (
                    <main>
     
    <HomeHeading/>
    <Navbar/>
    <HomeCarousel/>
    <Homepara/>
    <Homepro/>
    <UNS/>
    <Homeactions/>
    <HomeEnd/>
    <Download/>
    <EndIcons/>
    <TeamMembers/>
    <FooterPagePro/>
    
    
    {/* <FooterPagePro/> */}
    </main>
    )
}
    </>
  )
}

export default HomePage
