import "./App.css";
import MovieCard from "./components/MovieCard";
import {useCallback, useEffect, useState} from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import axios from "./api/axios";
import Nav from "./components/Nav";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<MovieDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;

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

  return (
    <main>
      {movieList.map((item) => (
        <MovieCard key={item.id} {...item} />
      ))}
    </main>
  );
};

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
