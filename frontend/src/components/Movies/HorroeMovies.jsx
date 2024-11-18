import React, { useEffect, useState } from 'react'
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faCrown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HorroeMovies = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        loadMoviesByGenres();
    }, [])
    const loadMoviesByGenres = async () => {
        try {
           
            let formData = new FormData();
            formData.append('data[salt]', process.env.REACT_APP_API_SALT);
            formData.append('data[sign]', process.env.REACT_APP_API_SIGN);
            formData.append('data[genre_id]', 6);
            formData.append('data[user_id]', localStorage.getItem('user_id') != null ? localStorage.getItem('user_id') : 271);
            axios.post(`${process.env.REACT_APP_API_URL}/movies_by_genre`, formData).then((response) => {
               
                console.log(response.data);
                setMovies(response.data.VIDEO_STREAMING_APP)
            })
        } catch (error) {
        }
    }
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
            <div className="slider-container">
                <h3 className='home-heading'>Horror Movies</h3>
                <Slider {...settings}>
                    {movies.map((card, index) => (
                        <Link to={`/movies/${card.video_id != null ? card.video_id : card.movie_id}`}>
                            <div key={index} className="card-wrapper">
                                <div className="card">
                                    <img src={card.video_image != null ? card.video_image : card.movie_poster} alt={card.video_title} className="card-img-top slick-slider-img" />
                                    <div className="carousel-number">
                                        {
                                            (card.video_access === 'Paid') ||
                                                (card.movie_access === 'Paid') ? (
                                                <span className='access-mode'><FontAwesomeIcon icon={faCrown} /></span>
                                            ) :
                                                (
                                                    <span className='access-mode'>Free</span>
                                                )
                                        }
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

export default HorroeMovies