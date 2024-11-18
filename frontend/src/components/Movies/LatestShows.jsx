import { faAngleLeft, faAngleRight, faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Header from '../Header';
import Slider from 'react-slick/lib/slider';
import { Link } from 'react-router-dom';
const LatestShows = ({ movies }) => {
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
    return (
        <>
            <Header />
            <div className="slider-container">
                <h3 className='home-heading'>Latest Shows</h3>
                <Slider {...settings}>
                    {movies.map((card, index) => (
                        <Link to={`/movies/${card.video_id}`}>
                            <div key={index} className="card-wrapper">
                                <div className="card">
                                    <div className="image">
                                        <img src={card.video_image} alt={card.video_title} className="card-img-top slick-slider-img" />
                                        <div className="carousel-number">
                                            {
                                                card.video_access === 'Paid' ? (
                                                    <span className='access-mode'><FontAwesomeIcon icon={faCrown} /></span>
                                                ) :
                                                    (
                                                        <span className='access-mode'>Free</span>
                                                    )
                                            }
                                        </div>
                                    </div>
                                    <div class="details">
                                        <div class="center">
                                            <h1>{card.video_title}</h1>
                                            <p>{card.video_type}</p>
                                        </div>
                                    </div>̦
                                </div>
                            </div>
                        </Link>
                    ))}
                </Slider>
            </div>
        </>
    )
}
export default LatestShows