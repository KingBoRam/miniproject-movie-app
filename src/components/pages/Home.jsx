import {useCallback, useEffect, useState} from "react";
import MovieCard from "../movies/MovieCard";
import axios from "../../api/axios";
import Row from "../common/Row";
import {FaArrowAltCircleUp} from "react-icons/fa";
import {GoTriangleDown} from "react-icons/go";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);

  const fetchMovies = useCallback(async (page) => {
    const res = await axios.get(`/movie/popular?page=${page}`);
    setMovieList((prevMovies) => [...prevMovies, ...res.data.results]);
  }, []);

  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]);

  // https://velog.io/@gnsdh8616/%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
  const listener = useCallback(() => {
    if (
      window.innerHeight + window.scrollY + 100 >=
      document.body.offsetHeight
    ) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [listener]);

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
