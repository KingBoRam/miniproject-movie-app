import "./App.css";
import movieListData from "../data/movieListData.json";
import MovieCard from "./components/MovieCard";
import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import MovieDetail from "./components/MovieDetail";

function App() {
  const [movieList, setMovieList] = useState(movieListData.results);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main>
            {movieList.map((item) => {
              return <MovieCard key={item.id} {...item}></MovieCard>;
            })}
          </main>
        }
      />
      <Route path="/details" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;
