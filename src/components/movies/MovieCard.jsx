import "./MovieCard.css";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {GoStarFill} from "react-icons/go";

const MovieCard = (item) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${item.id}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <img
        className="card-poster"
        src={
          item.poster_path === null ||
          item.poster_path === "" ||
          item.poster_path === undefined
            ? "/images/blue.png"
            : `https://image.tmdb.org/t/p/w200/${item.poster_path}`
        }
        alt="poster"></img>
      <p className="card-title">
        {item.title || item.original_name || item.original_title}
      </p>
      <div className="card-information">
        <GoStarFill className="card-icon" />
        <p className={isDarkMode ? "card-vote-dark" : "card-vote_average"}>
          {(Math.round(item.vote_average * 10) / 10).toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
