import "./Row.css";
import {useEffect, useState} from "react";
import axios from "../../api/axios";

// import Swiper core and required modules
import {Swiper, SwiperSlide} from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./swipe.css";
import "swiper/css/navigation";
// import required modules
import {EffectCoverflow, Pagination, Navigation} from "swiper/modules";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Row = () => {
  const [topMovies, setTopMovies] = useState([]);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    const bulletSelectors = [
      ".swiper-pagination-bullet-active-prev",
      ".swiper-pagination-bullet-active-prev-prev",
      ".swiper-pagination-bullet-active-next",
      ".swiper-pagination-bullet-active-next-next",
    ];
    bulletSelectors.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        if (isDarkMode) {
          element.classList.add("swiper-bullet-dark-mode");
        } else {
          element.classList.remove("swiper-bullet-dark-mode");
        }
      }
    });
  }, [isDarkMode]);

  useEffect(() => {
    axios
      .get("/movie/top_rated?page=1")
      .then((res) => setTopMovies(res.data.results));
  }, []);

  const navigate = useNavigate();

  // https://swiperjs.com/demos

  return (
    <div className="row-container">
      <Swiper
        effect={"coverflow"}
        rewind={true}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          scale: 1,
          slideShadows: true,
        }}
        initialSlide={10}
        modules={[EffectCoverflow, Pagination, Navigation]}
        navigation
        pagination={{
          dynamicBullets: true,
        }}
        className="mySwiper">
        {topMovies.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              className="row-img"
              onClick={() => {
                navigate(`/${item.id}`);
              }}
              alt={item.title}
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Row;
