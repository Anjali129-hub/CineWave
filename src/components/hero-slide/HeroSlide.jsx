import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useNavigate } from "react-router-dom";
import Button, { OutlineButton } from "./../button/Button";
import Modal, { ModalContent } from "./../modal/Modal";

import tmdbApi, { category, movieType } from "./../../api/tmdbApi";
import apiConfig from "./../../api/apiConfig";

import "./hero-slide.scss";
import * as Config from "./../../constants/Config";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [activeTrailer, setActiveTrailer] = useState(null); // currently active trailer

  const navigate = useNavigate();

  // Fetch popular movies safely
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, { params: { page: 1 } });
        setMovieItems(response.results?.slice(0, 4) || []);
      } catch (err) {
        console.error("Failed to fetch popular movies:", err);
        setMovieItems([]);
      }
    };
    getMovies();
  }, []);

  // Open trailer modal safely
  const openTrailer = async (item) => {
    try {
      const videos = await tmdbApi.getVideos(category.movie, item.id);
      if (videos.results.length > 0) {
        setActiveTrailer(`https://www.youtube.com/embed/${videos.results[0].key}`);
      } else {
        setActiveTrailer("NO_TRAILER");
      }
    } catch (err) {
      console.error("Failed to fetch trailer:", err);
      setActiveTrailer("NO_TRAILER");
    }
  };

  // Close trailer modal
  const closeTrailer = () => setActiveTrailer(null);

  if (movieItems.length === 0) {
    return <div className="hero-slide"><p>Loading...</p></div>;
  }

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
      >
        {movieItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="hero-slide__item"
              style={{
                backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`,
              }}
            >
              <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                  <h2 className="title">{item.title}</h2>
                  <div className="overview">{item.overview}</div>
                  <div className="btns">
                    <Button onClick={() => navigate(`/${Config.HOME_PAGE}/movie/${item.id}`)}>
                      Watch now
                    </Button>
                    <OutlineButton onClick={() => openTrailer(item)}>
                      Watch trailer
                    </OutlineButton>
                  </div>
                </div>
                <div className="hero-slide__item__content__poster">
                  <img src={apiConfig.w500Image(item.poster_path)} alt={item.title} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Trailer Modal */}
      <Modal active={!!activeTrailer} onClose={closeTrailer} id="hero-trailer-modal">
        <ModalContent onClose={closeTrailer}>
          {activeTrailer === "NO_TRAILER" ? (
            <p>No trailer available</p>
          ) : (
            <iframe
              width="100%"
              height="500px"
              title="trailer"
              src={activeTrailer || ""}
              allowFullScreen
            ></iframe>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default HeroSlide;
