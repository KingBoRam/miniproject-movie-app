import {useNavigate} from "react-router-dom";
import "./MovieCard.css";
import {GoStarFill} from "react-icons/go";

const MovieCard = (item) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${item.id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img
        className="card-poster"
        src={
          item.poster_path === null ||
          item.poster_path === "" ||
          item.poster_path === undefined
            ? "/images/blue.png"
            : `https://image.tmdb.org/t/p/original/${item.poster_path}`
        }
        alt="poster"></img>
      <p className="card-title">
        {item.title || item.original_name || item.original_title}
      </p>
      <div className="card-poster-2">
        <GoStarFill className="card-icon" />
        <p className="card-vote_average">
          {(Math.round(item.vote_average * 10) / 10).toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
