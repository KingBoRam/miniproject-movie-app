import {useEffect, useState} from "react";
import "./MovieDetail.css";
import {useParams} from "react-router-dom";
import axios from "../../api/axios";
import {GoStarFill} from "react-icons/go";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState({});
  console.log(movieDetail);
  const param = useParams();

  // https://velog.io/@rgfdds98/debuging-React-Hook-useEffect-has-a-missing-dependency-fetchMovieData.-Either-include-it-or-remove-the-dependency-array
  useEffect(() => {
    axios.get(`/movie/${param.id}`).then((res) => setMovieDetail(res.data));
  }, [param]);

  return (
    <div className="detail-container">
      <img
        className="detail-poster"
        src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`}></img>
      <div className="detail-description">
        <h1 className="detail-description__title">{movieDetail.title}</h1>
        <p className="detail-description__vote-average">
          <GoStarFill className="detail-icon" />
          {(Math.round(movieDetail.vote_average * 10) / 10).toFixed(1)}
        </p>
        <p className="detail-description__genres">
          {movieDetail.genres?.map((genre) => {
            return (
              <span className="detail-description__genre" key={genre.id}>
                {genre.name}
              </span>
            );
          })}
        </p>
        <p className="detail-description__overview">{movieDetail.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
