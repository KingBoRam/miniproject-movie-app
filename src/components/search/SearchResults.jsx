import "./SearchResults.css";
import axios from "../../api/axios";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import MovieCard from "../movies/MovieCard";
import {useDebounce} from "../hooks/useDebounce";

const SearchResults = () => {
  const [movieList, setMovieList] = useState([]);

  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const searchTerm = query.get(`q`);
  const deBouncedSearchTerm = useDebounce(searchTerm, 500);

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
      {movieList.map((item) => (
        <MovieCard className="search-card" key={item.id} {...item} />
      ))}
    </div>
  );
};

export default SearchResults;
