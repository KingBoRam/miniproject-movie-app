import "./Home.css";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../components/store/bookmarkSlice";
import axios from "../api/axios";
import {FaArrowAltCircleUp} from "react-icons/fa";
import {getUserInfoToFirebase} from "../../firebase";
import {GoTriangleDown} from "react-icons/go";
import Row from "../components/common/Row";
import MovieCard from "../components/movies/MovieCard";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const bookmark = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfoToFirebase((user) => {
      if (user && bookmark.find((ex) => ex.uid === user.uid)) {
        return;
      } else if (user) {
        const uid = user.uid;
        dispatch(addUser({uid, bookmark: []}));
      }
    });
  }, [bookmark, dispatch]);

  const getMoiveDataTmdb = useCallback(async (page) => {
    const res = await axios.get(`/movie/popular?page=${page}`);
    setMovieList((prevMovies) => [...prevMovies, ...res.data.results]);
  }, []);

  useEffect(() => {
    getMoiveDataTmdb(page);
  }, [page, getMoiveDataTmdb]);

  // https://velog.io/@gnsdh8616/%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
  const infinityScrollToGetMovieData = useCallback(() => {
    if (
      window.innerHeight + window.scrollY + 100 >=
      document.body.offsetHeight
    ) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", infinityScrollToGetMovieData);
    return () => {
      window.removeEventListener("scroll", infinityScrollToGetMovieData);
    };
  }, [infinityScrollToGetMovieData]);

  const handleClick = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  return (
    <>
      <div className="container">
        <Row></Row>
        <div className="btn-container">
          <FaArrowAltCircleUp className="main-up-btn" onClick={handleClick} />
        </div>
        <div className="main-text">
          Popular Movies <GoTriangleDown />
        </div>
        <main>
          {movieList.map((item) => (
            <MovieCard key={item.id} {...item} />
          ))}
        </main>
      </div>
    </>
  );
};

export default Home;
