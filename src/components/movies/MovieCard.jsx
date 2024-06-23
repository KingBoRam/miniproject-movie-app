import "./MovieCard.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {GoStarFill} from "react-icons/go";
import axios from "../../api/axios";
import {useState, useEffect} from "react";

const MovieCard = ({
  item,
  draggable,
  onDragStart,
  onDragOver,
  onDragEnter,
  onDragEnd,
}) => {
  const {
    id,
    title,
    original_name,
    original_title,
    backdrop_path,
    vote_average,
  } = item;
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const location = useLocation().pathname;
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const navigate = useNavigate();

  const cardPosterSrc = backdrop_path
    ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
    : "/images/blue.png";

  const playingMovie = () => {
    axios
      .get(`/movie/${id}`, {params: {append_to_response: "videos"}})
      .then((res) => {
        const videos = res.data.videos.results;
        if (videos && videos.length > 0) {
          const videoKey = videos[0].key;
          const videoSrc = `https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&mute=1&playsinline=1`;
          setVideoUrl(videoSrc);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleMouseOver = () => {
    const timeout = setTimeout(playingMovie, 1500);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setVideoUrl(null); // Reset the video URL when the mouse leaves
  };

  return (
    <Link className="card-link" to={`/${id}`} onMouseLeave={handleMouseLeave}>
      <div
        className="card"
        draggable={location === "/mypage" ? draggable : null}
        onDragStart={location === "/mypage" ? onDragStart : null}
        onDragEnter={location === "/mypage" ? onDragEnter : null}
        onDragEnd={location === "/mypage" ? onDragEnd : null}
        onDragOver={location === "/mypage" ? onDragOver : null}>
        {videoUrl ? (
          <iframe
            className="card-poster"
            src={videoUrl}
            title="video"
            allowFullScreen
            style={{pointerEvents: "none"}}></iframe>
        ) : (
          <img
            className="card-poster"
            src={cardPosterSrc}
            alt="poster"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          />
        )}

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
