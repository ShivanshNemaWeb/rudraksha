import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import "./Footer.css";
export default function FooterPagePro() {
  return (
    <div className='footer' id="Fp">
      <MDBFooter className='text-center text-lg-start text-muted MDB'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom fupperdiv'>
          <div className='me-5 d-none d-lg-block'>
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href='' className='me-4 text-reset'>
              <i style={{ color: "#3b5998" }} className='fa fa-facebook-f'></i>
            </a>
            <a href='' className='me-4 text-reset'>
              <i style={{ color: "skyblue" }} className='fa fa-twitter'></i>
            </a>
            <a href='' className='me-4 text-reset'>
              <i style={{ color: "#e52d27" }} className='fa fa-youtube'></i>
            </a>
            <a href='' className='me-4 text-reset'>
              <i style={{ color: "#bc2a8d" }} className='fa fa-instagram'></i>
            </a>
            <a href='' className='me-4 text-reset'>
              <i style={{ color: "#0976b4" }} className='fa fa-linkedin'></i>
            </a>
          </div>
        </section>

        <section className='FooterSection'>
          <div className='container text-center text-md-start mt-5'>
            <div className='row mt-3'>
              <div className='col-sm-4 col-md-3 col-lg-4 col-xl-5 mx-auto mb-4  div1f text-center'>
                <img src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                <h4 className='text-uppercase fw-bold mb-4'>
                  <span className='fspan1'>RUDRAKSHA</span>
                  <span className='fspan2'>WELFARE</span>
                  <span className='fspan3'>FOUNDATION</span>
                </h4>
                <ul className=''>
                  <li>Home</li>
                  <li>Disclaimer</li>
                  <li>Copyright</li>
                  <li>Cookies</li>
                </ul>
              </div>

              <div className='col-sm-4 col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 div2f'>
                <h6 style={{ color: "skyblue" }} className='text-uppercase fw-bold '>Contact</h6>
                <p>
                  <i style={{ color: "yellow" }} className='fa fa-home me-3'></i> Office booth no:754, ground floor,Mohalla Dehra Sahib,Near NAC Manimajra Chandigarh UT:160101
                </p>
                <p>
                  <i style={{ color: "aqua" }} className='fa fa-envelope me-3'></i>
                  -----
                </p>
                <p>
                  <i style={{ color: "brown" }} className='fa fa-phone me-3'></i> -----
                </p>
              </div>

              <div className='col-md-2 col-lg-2 col-xl-4 mx-auto mb-4 div3f'>
                <p className='text-uppercase fw-bold mb-4 div3para'>
                  <span className='fspan1'>Rudraksha</span>
                  <span>Welfare</span>
                  <span className='fspan3'>Foundation</span>
                  </p>
                <p>
                  A Section 8 Company (Non Profit Organization) under Companies Act 2013, Ministry of Corporate Affairs, Govt. of INDIA.
                </p>
              </div>




            </div>
          </div>
        </section>

        <div className='text-center p-4 div4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>

          ©Copyright © 2022 RUDRAKSHA- All rights reserved.
          {/* <a className='text-reset fw-bold' href='/'>
            Rudraksha.org.in
          </a> */}
        </div>
      </MDBFooter>
    </div>
  );
}