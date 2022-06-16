import React, { Component } from 'react';
import './Homepro.css'
import './Homepro.scss'

// 



// import './Homepro.scss'


function Homepro() {

  return (
    <div>
      <div className='Projectheading'>
        <div className='Fadeeffect'></div>
        <h1>OUR PROJECTS</h1>
        
        
        </div>
        
        

     
      <div id="carouselExampleControls" className="carousel slide carousel-fade m-3" data-bs-ride="carousel">
        <div className='ProjectCarousel'>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="5000">
              <div className='ProjectCards1'>
                <div class="card shadow  gradientb" >
                  <img src={require('../../Images/1P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body">
                    <img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                    <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">The Project <span>YATHA VAYUTPATTI</span>, will be working Religiously to nurture & care the Art & Culture of forgotten era, old literatures, cultural & beliefs of various creeds our Hindu civilization.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>


                <div class="card shadow  gradientb" >
                  <img src={require('../../Images/2P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body">
                  <img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">The Project <span>RAKTH CHARITA</span>, will be working over Creating Awareness among Public Regarding dire need of Blood Donors along with Setting up Donation Programmes around different States & daily Free Blood Donor services.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>

                <div class="card shadow  gradientb" >
                  <img src={require('../../Images/3P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body">
                  <img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">This Project <span>VAGUNAYA</span>, will be directed towards providing Health & Educational support to Youth & protect them from Drugs Addiction under surveillance of Police & Administration.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <div className='ProjectCards2'>
                <div class="card gradientb" >
                  <img src={require('../../Images/4P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body"><img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">The Project <span>SOOKASHAM RAKSHANAM</span> is rigorous concentration of care & plantation of existing & new tress in society & road sides.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>


                <div class="card gradientb" >
                  <img src={require('../../Images/5P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body"><img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">Our Project <span>ARADHNARISHVAR</span> is based on providing basic human rights and advantages to Women & Transgender with a prime motive of their identity upliftment.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>

                <div class="card gradientb" >
                  <img src={require('../../Images/6P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body"><img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">Our Project <span>VIKRIT VAIDHARMYA</span> is based on providing medical & emotional physiological support for Acid Survivors; in lieu of their upliftment.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <div className='ProjectCards3'>
                <div class="card gradientb" >
                  <img src={require('../../Images/7P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body"><img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">The Project <span>ANTEYASHTY SVAAMYAM</span> is based on assisting in protecting the Human Rights with a prime motive of offering No Cost Last Rites Facilities of unclaimed bodies or to weaker sections of Society via proper tia up with Administration.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>


                <div class="card gradientb" >
                  <img src={require('../../Images/8P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body"><img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">This Project <span>AVASHTAMBH</span> will be primarily focussed in providing Basic Needs, Health Care, Entertainment, Emotional & Religious Support to various Senior Citizens Homes, Blind Homes as well as Orphanages in our Country.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>

                <div class="card gradientb" >
                  <img src={require('../../Images/9P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body"><img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">The Project <span>YOGESHVAR</span> will be an initiative to support various talents in the field of internal or external sports; which have challenges due to financial constraints or technical difficulties.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <div className='ProjectCards3'>
                <div class="card gradientb" >
                  <img src={require('../../Images/10P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body"><img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">The Project <span>RUDRASHAKTI</span>, will be specifically working to support the families of our Defence Personals; who have made the Supreme Sacrifice for the Nation.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>


                <div class="card gradientb" >
                  <img src={require('../../Images/11P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body"><img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">This Project <span>AACHARYA</span>  will be rigorously working to provide Specialised Training & Knowledge Bytes for Students of various streams as well as personal professional grooming.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>

                <div class="card gradientb" >
                  <img src={require('../../Images/12P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body"><img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">This Project <span>ADDHYAN </span>, will be providing No cost Coaching of various subjects for Students up-till Higher Secondary Levels in respect to basic Education criteria.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <div className='ProjectCards3'>
                <div class="card gradientb" >
                  <img src={require('../../Images/13P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body"><img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">This Project <span>AAROGYA</span>, will be working to offer Free medical consultations, check ups and medicines from Certified Doctors of Ayurvedic, Homeopathic & Allopathy medicinal cultures.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>


                <div class="card gradientb" >
                  <img src={require('../../Images/14P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body"><img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">The Project <span>PASHVIK MANGALYA</span>, will be working to provide Food, Adaptation, Shelter, Medical & Basic Animal Rights support for Stray, Owned as well as Animals in Zoo captivity.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>

                <div class="card gradientb" >
                  <img src={require('../../Images/15P.jpg')
                  } class="card-img-top" alt="..." />
                  <div class="card-body"><img className='ProLogo' src={require('../../Images/LogoLoad.jpeg')
                } ></img>
                  <h5 class="card-title">RUDRAKSHA</h5>
                    <p class="card-text">The Project <span>PRANIKA</span>, will be working with a motive to enhance the Educational, Basic Rights, Health, Skill Development, Job Opportunities & Social Personal Security.</p>
                    <button type="button" class="btn btn-outline-info buttonpro">Read More</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button className="carousel-control-prev ProjectControl1" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

      </div>

    </div >
  )
}

export default Homepro

