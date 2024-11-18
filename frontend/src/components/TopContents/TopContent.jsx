import { faAngleLeft, faAngleRight, faBookmark, faPencilAlt, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import Slider from 'react-slick/lib/slider';
import { faHeart as regularHeart, faBookmark as regularBookmark, faClock as regularClock, faPencil as regularPencil } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

import AOS from "aos";
import "aos/dist/aos.css";

const TopContent = ({ topContent }) => {

    useEffect(() =>{
        AOS.init({
            disable: "phone",
            duration: 700,
            easing: "zoom-in-up",
          });
    },[]);


    const user_id = localStorage.getItem('dastaan__user_id') !== null ? localStorage.getItem('dastaan__user_id') : null
    const CustomNextArrow = ({ onClick }) => (
        <button className="custom-next-arrow" onClick={onClick}>
            <FontAwesomeIcon aria-hidden="true" icon={faAngleRight} />
        </button>
    );
    const CustomPrevArrow = ({ onClick }) => (
        <button className="custom-prev-arrow" onClick={onClick}>
            <FontAwesomeIcon aria-hidden="true" icon={faAngleLeft} />
        </button>
    );
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    };
    return (
        <div className='slider-container'  
        data-aos="fade-up" 
        data-aos-delay="100"
        data-aos-duration="1000"
        >
        <>
            <div  className='mt-2'>
                <h3 className="home-heading">Top Contents</h3>
                <Slider {...settings}>
                    {topContent.map((audFile,index) => {
                     /*    const hr = (audFile.duration / 3600).toFixed(2);
                        const hrArr = hr.split('.');
                        const min = (hrArr[1] / 60).toFixed(2);
                        const minArr = min.split('.');
                        const sec = parseInt(minArr[1]); */
                        return (
                            <div key={audFile.audio_file_id} className="card-wrapper">
                                <div className="card" style={{height:"120px"}}>
                                    <div className='image'>
                                        <img src={audFile.landscape_thumb} alt={audFile.title} className="card-img-top slick-slider-img" />
                                    </div>
                                    <div className="details">
                                        <div className="center">
                                            <Row>
                                                <Col md={12} sm={12} xs={12}>
                                                    <span className='file-title text-white'>{audFile.title}</span>
                                                </Col>
                                                <Col md={4} sm={4} xs={4}>
                                                    <Link to={`/audio-file-detail/${audFile.audio_file_id}`}>
                                                        <FontAwesomeIcon icon={faPlay}
                                                            style={{
                                                                border: '1px solid #f44306',
                                                                padding: '6px 8px 6px 8px',
                                                                borderRadius: '50%',
                                                                color: "#f44306"
                                                            }}
                                                        />
                                                    </Link>
                                                </Col>
                                                {
                                                    user_id !== null ? (<Col md={4} sm={4} xs={4}>
                                                        <FontAwesomeIcon
                                                            style={{ color: 'white', fontWeight: 900 }} aria-hidden="true"
                                                            icon={audFile.wishlist_id !== null ? faBookmark : regularBookmark} />
                                                    </Col>) : ''
                                                }
                                              
                                                {/* <Col md={12} sm={12} xs={12}>
                                                    <FontAwesomeIcon icon={faPencilAlt} />&nbsp;
                                                    <span className='text-white'>{audFile.author}</span>
                                                </Col>
                                                <Col md={12} sm={12} xs={12}>
                                                    <FontAwesomeIcon icon={regularClock} /> &nbsp;
                                                   
                                                </Col> */}
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </>
        </div>
    )
}
export default TopContent