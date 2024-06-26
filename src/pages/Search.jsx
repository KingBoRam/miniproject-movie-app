import "./Search.css";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDebounce} from "../hooks/useDebounce";
import axios from "../api/axios";
import MovieCard from "../components/movies/MovieCard";

const Search = () => {
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate();
  let query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get(`q`);
  const deBouncedSearchTerm = useDebounce(searchTerm, 700);

  useEffect(() => {
    if (deBouncedSearchTerm !== "" && deBouncedSearchTerm !== null) {
      const options = {
        params: {
          query: `${deBouncedSearchTerm}`,
          include_adult: "false",
        },
      };
      axios
        .get("/search/multi", options)
        .then((res) => {
          setMovieList(res.data.results);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      navigate("/");
    }
  }, [deBouncedSearchTerm, navigate]);

  return (
    <div className="search-container">
      {movieList.length === 0 ? (
        <div className="search-noresult">검색 결과가 없습니다.</div>
      ) : (
        movieList.map((item) => (
          <MovieCard className="search-card" key={item.id} item={item} />
        ))
      )}
    </div>
  );
};

export default Search;
