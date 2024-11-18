import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faCrown } from '@fortawesome/free-solid-svg-icons';
const TopTrendingMovies = ({ toptrendings }) => {
    // console.log(toptrendings);
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
            <h3 className='home-heading'>Top Trendings</h3>
            <Slider {...settings}>
                {toptrendings.map((card, index) => (
                    <div key={index} className="card-wrapper">
                        <div className="card">
                        <Link to={`/movies/${card.video_id}`}>
                            <div className='image'>
                               
                                    <img src={card.video_image} alt={card.video_title} className="slick-slider-img card-img-top" />
                                    <div className="carousel-number">{index + 1}
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
                            </div>
                        </Link>
                    </div>
                    </div>
                ))}
    </Slider >
        </div >
    </>
    )
}
export default TopTrendingMovies