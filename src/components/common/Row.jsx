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
import {Link} from "react-router-dom";
// import {useSelector} from "react-redux";

const Row = () => {
  const [topMovies, setTopMovies] = useState([]);

  // 이 컴포넌트에 주석처리 된 부분은, darkmode일때 클래스네임을 추가해서 색상을 변경시키기 위함인데
  // 이게 새로고침시에는 적용이 안된다. 그러다보니까 뭐 oninit했을 때 추가하고 어쩌고 하는
  // 복잡한 과정이 점점 추가되어야했다. 아마도 리액트인데 dom을 직접 조작하다보니 문제가 생겼던게
  // 아닐까 싶었다 (참조 : https://sylagape1231.tistory.com/59)
  // 그리고 지피티를 통해서 수정하다보니 점점 코드가 내가 이해할 수 없는 방향으로 흘러서 모두 일단 지웠다.
  // 근본적으로 bullet에 opacity가 있어서 문제였던거라 그냥 opacity를 지워서 문제는 해결했지만
  // 이후에 클래스네임을 또 추가하고 싶은 상황이 있을수도 있겠다 싶어서 남겨둠
  // const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // const updateBulletClasses = useCallback(() => {
  //   const bulletSelectors = [
  //     ".swiper-pagination-bullet-active-prev",
  //     ".swiper-pagination-bullet-active-prev-prev",
  //     ".swiper-pagination-bullet-active-next",
  //     ".swiper-pagination-bullet-active-next-next",
  //   ];
  //   bulletSelectors.forEach((selector) => {
  //     const elements = document.querySelectorAll(selector);
  //     elements.forEach((element) => {
  //       if (isDarkMode) {
  //         element.classList.add("swiper-bullet-dark-mode");
  //       } else {
  //         element.classList.remove("swiper-bullet-dark-mode");
  //       }
  //     });
  //   });
  // }, [isDarkMode]);

  // useEffect(() => {
  //   updateBulletClasses();
  // }, [isDarkMode, updateBulletClasses]);

  useEffect(() => {
    axios
      .get("/movie/top_rated?page=1")
      .then((res) => setTopMovies(res.data.results));
  }, []);

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
        className="mySwiper"
        // onInit={(swiper) => {
        //   // Swiper 초기화 후 bullet 클래스 업데이트
        //   updateBulletClasses();
        //   // 초기화 후 bullet 클래스를 동적으로 변경하기 위해 Observer를 사용
        //   const observer = new MutationObserver(updateBulletClasses);
        //   swiper.pagination.el
        //     .querySelectorAll(".swiper-pagination-bullet")
        //     .forEach((bullet) => {
        //       observer.observe(bullet, {attributes: true});
        //     });
        // }
        // }
      >
        {topMovies.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/${item.id}`}>
              <img
                className="row-img"
                alt={item.title}
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Row;
