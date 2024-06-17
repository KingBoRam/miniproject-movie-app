import "./MovieCard.css";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {GoStarFill} from "react-icons/go";

const MovieCard = ({
  item,
  draggable,
  onDragStart,
  onDragOver,
  onDragEnter,
  onDragEnd,
}) => {
  const {id, title, original_name, original_title, poster_path, vote_average} =
    item;
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const location = useLocation().pathname;

  const cardPosterSrc = poster_path
    ? `https://image.tmdb.org/t/p/w200/${poster_path}`
    : "/images/blue.png";

  return (
    <Link className="card-link" to={`/${id}`}>
      <div
        className="card"
        draggable={location === "/mypage" ? draggable : null}
        onDragStart={location === "/mypage" ? onDragStart : null}
        onDragEnter={location === "/mypage" ? onDragEnter : null}
        onDragEnd={location === "/mypage" ? onDragEnd : null}
        onDragOver={location === "/mypage" ? onDragOver : null}>
        <img className="card-poster" src={cardPosterSrc} alt="poster" />
        <p className="card-title">{title || original_name || original_title}</p>
        <div className="card-information">
          <GoStarFill className="card-icon" />
          <p className={isDarkMode ? "card-vote-dark" : "card-vote_average"}>
            {(Math.round(vote_average * 10) / 10).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
