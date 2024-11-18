import React from 'react'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules';
const Slider = ({ sliders }) => {
    // console.log(sliders);
    // return
    return (
        <>
            <Swiper
                /*  slidesPerView={'auto'}
                 spaceBetween={30}
                 pagination={{
                   clickable: true,
                 }}
                 autoplay={true}
                 delay={1500} */
                 slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    1024: {
                        // slidesPerView: 'auto',
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                loop={true}
                // autoplay={{ delay: 1500 }}
                
                
                autoplay={{ delay: 1500000}}

                effect="fadeIn"
                fadeEffect={{ crossFade: true }}
                modules={[Pagination, Navigation,
                    Scrollbar,
                    A11y,
                    Autoplay,
                    EffectFade
                    
                ]}
                className="mySwiper mt-6"
            >
                {sliders.map((slider, index) => (
                    <SwiperSlide>
                         <Link to={`/audio-file-detail/${slider.id}`} >
                        <div className="slide-content" style={{
                            backgroundImage: `url('${slider.slider_image}')`
                        }}>
                           {/*  <div className='mt-10'>
                              
                                <button className="btn btn-primary animated fadeIn">
                                    <Link to={`/audio-file-detail/${slider.id}`} >▶ Play Now</Link>
                                </button>
                            </div> */}
                        </div>
                        {/* <div className="overlay"></div> */}
                        </Link>
                    </SwiperSlide>
                    /*  <Carousel.Caption>
                         <h3 className="animated-text"></h3>
                     </Carousel.Caption> */
                ))}
            </Swiper>
        </>
        /*   <Carousel className='mt-5'>
              {sliders.map((slider, index) => (
                  <Carousel.Item
                      interval={3000}
                      key={index}
                  >
                      <div className="overlay"></div>
                      <img
                          key={index}
                          className="d-block w-100 carousel-img"
                          src={slider.landscape_thumb}
                          alt={slider.title}
                      />
                      <Carousel.Caption>
                          <h3 className="animated-text">{slider.title}</h3>
                          <Link to={`/audio-file-detail/${slider.audio_file_id}`} className="animated-text  btn btn-sm btn-primary">▶ Play Now</Link>
                      </Carousel.Caption>
                  </Carousel.Item>
              ))}
          </Carousel> */
    );
}
export default Slider