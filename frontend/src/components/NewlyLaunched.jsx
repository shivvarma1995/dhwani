import React from 'react'
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewlyLaunched = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const cardData = [
        { title: 'Card Title 1', image: 'https://c8.alamy.com/comp/BKJWY7/robots-2005-animated-poster-rbot-001-009-BKJWY7.jpg' },
        { title: 'Card Title 2', image: 'https://rukminim2.flixcart.com/image/850/1000/l1whaq80/poster/0/p/a/small-poster-onward-movie-poster-wall-poster-300gsm-matt-13x19-original-imagddyjk7bfgwsc.jpeg?q=20&crop=false' },
        { title: 'Card Title 3', image: 'https://www.tallengestore.com/cdn/shop/products/TheSecretWorldOfArrietty-StudioGhibliJapanaeseAnimatedFilmPoster_568d22d7-8c40-496f-af4d-76a88069703d.jpg?v=1642160588' },
        { title: 'Card Title 4', image: 'https://www.tallengestore.com/cdn/shop/products/SpiritedAway-Miyazaki-StudioGhibli-JapanaeseAnimatedMoviePoster_90a70b97-85e0-4430-adff-71d9dd66dead_large.jpg?v=1642160555' },
        { title: 'Card Title 5', image: 'https://i.pinimg.com/736x/75/63/d4/7563d450b81170ab305de9c4d2a4e0fc.jpg' },
        { title: 'Card Title 6', image: 'https://c8.alamy.com/comp/BKBA4T/planet-51-year-2009-director-jorge-blanco-animation-movie-poster-fr-BKBA4T.jpg' },
    ];
    return (<>
        
        <div className="slider-container">
            <h3 className='home-heading'>Newly Launched</h3>
            <Slider {...settings}>
                {cardData.map((card, index) => (
                    <div key={index} className="card-wrapper">
                        <div className="card">
                            <img src={card.image} alt={card.title} className="slick-slider-img card-img-top" />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    </>
    )
}

export default NewlyLaunched