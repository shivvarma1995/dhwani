import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const RecentWatch = ({ recentlywatched }) => {
    // console.log(recentlywatched);
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
        infinite: true,
        speed: 500,
        slidesToShow: 8,
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
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (<>
        <div className="slider-container">
            <h3 className='home-heading'>Continue Watching</h3>
            <Slider {...settings}>
                {recentlywatched.map((card, index) => (
                    <Link to={`watch/${card.video_id}`}>
                        <div key={index} className="card-wrapper">
                            <div className="card">
                                <div className="overlay"></div>
                                <div className='image'>
                                    <img src={card.video_thumb_image} alt={card.video_id} className="card-img-top slick-slider-img" />
                                    <div className='play-btn'>▶</div>
                                    <ProgressBar className='seek-bar' now={card.percentage} />
                                </div>
                                
                            </div>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    </>
    )
}
export default RecentWatch