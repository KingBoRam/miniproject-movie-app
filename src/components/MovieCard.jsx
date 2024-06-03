import {useNavigate} from "react-router-dom";
import "./MovieCard.css";

const MovieCard = (item) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/details");
  };
  return (
    <div className="card" onClick={handleClick}>
      <img
        className="card-poster"
        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
        alt="poster"></img>
      <p className="card-title">{item.title}</p>
      <p className="card-vote_average">{item.vote_average}</p>
    </div>
  );
};

export default MovieCard;
