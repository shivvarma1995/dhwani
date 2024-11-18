import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);
const MovieSlider = () => {
    return (
        <div className="movie-slider">
        <Swiper
          spaceBetween={10}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 5 }
          }}
          className="mySwiper"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="movie-slide" style={{ backgroundImage: `url(${movie.posterUrl})` }}>
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.releaseDate}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
}
export default MovieSlider