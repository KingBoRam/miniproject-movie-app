import {useState} from "react";
import movieDetailData from "../../data/movieDetailData.json";
import "./MovieDetail.css";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState(movieDetailData);
  console.log(movieDetail);
  return (
    <div className="detail-container">
      <img
        className="detail-poster"
        src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`}></img>
      <div className="detail-description">
        <div className="detail-description-content">
          <p className="detail-description__title">{movieDetail.title}</p>
          <p className="detail-description__vote-average">
            {movieDetail.vote_average}
          </p>
        </div>
        <p className="detail-description__genres">
          {movieDetail.genres.map((genre) => {
            return (
              <span className="detail-description__genre" key={genre.id}>
                {genre.name}
              </span>
            );
          })}
        </p>
        <p className="detail.description__overview">{movieDetail.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
