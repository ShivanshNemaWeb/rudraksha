import React from 'react'
import './HomeCar.css'
function HomeCarousel() {
  return (
    <div className='main'>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner " id="incarousel">
        <div className="carousel-item active rounded">
          <img src={require('../../Images/Carousel 1.jpeg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item rounded">
          <img src={require('../../Images/Carousel 2.jpeg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item ">
          <img src={require('../../Images/Carousel 3.jpg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item ">
          <img src={require('../../Images/carousel 4.jpg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item ">
          <img src={require('../../Images/carousel 5.jpg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item ">
          <img src={require('../../Images/carousel 6.jpg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item ">
          <img src={require('../../Images/carouselnew.jpg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item ">
          <img src={require('../../Images/carousel 8.jpg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item ">
          <img src={require('../../Images/carousel 9.jpg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item ">
          <img src={require('../../Images/carousel 10.jpg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item ">
          <img src={require('../../Images/carousel 11.jpg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item ">
          <img src={require('../../Images/carousel 12.jpg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item ">
          <img src={require('../../Images/carousel 13.jpg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item ">
          <img src={require('../../Images/carousel 14.jpg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        <div className="carousel-item ">
          <img src={require('../../Images/carousel 15.jpg')
                }  className="d-block w-100 rounded" alt="..."/>
        </div>
        
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>
  )
}

export default HomeCarousel
