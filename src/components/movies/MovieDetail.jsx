import "./MovieDetail.css";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addbookmark, deletebookmark} from "../store/bookmarkSlice";
import {getUserInfoToFirebase} from "../../../firebase";
import axios from "../../api/axios";
import {GoStarFill} from "react-icons/go";
import {BsFillBookmarkStarFill} from "react-icons/bs";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [uid, setUid] = useState(null);
  const [vibration, setVibration] = useState("");
  const bookmark = useSelector((state) => {
    return state.bookmark;
  });
  const dispatch = useDispatch();
  const param = useParams();

  // https://velog.io/@rgfdds98/debuging-React-Hook-useEffect-has-a-missing-dependency-fetchMovieData.-Either-include-it-or-remove-the-dependency-array
  useEffect(() => {
    axios.get(`/movie/${param.id}`).then((res) => setMovieDetail(res.data));
  }, [param]);

  useEffect(() => {
    getUserInfoToFirebase((user) => {
      setUid(user.uid);
    });
  });

  const handleBookmarkClick = () => {
    setVibration("vibration");
    setTimeout(() => {
      setVibration("");
    }, 400);

    getUserInfoToFirebase((user) => {
      if (!user) {
        alert("로그인이 필요한 기능입니다.");
      } else {
        setIsBookmarked(!isBookmarked);
        if (isBookmarked === true) {
          const paramId = param.id;
          dispatch(deletebookmark({uid, paramId}));
        } else {
          const paramId = param.id;
          dispatch(addbookmark({uid, paramId}));
        }
      }
    });
  };

  useEffect(() => {
    const user = bookmark.find((item) => item.uid === uid);
    const userBookmark = user?.bookmark;
    if (userBookmark?.includes(param.id)) {
      setIsBookmarked(true);
    }
  }, [bookmark, param, uid]);

  return (
    <div className="detail-container">
      <img
        className="detail-poster"
        src={
          movieDetail.backdrop_path !== null ||
          movieDetail.backdrop_path !== "" ||
          movieDetail.backdrop_path !== undefined
            ? `https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`
            : "/images/blue.png"
        }></img>
      <div className="detail-description">
        <BsFillBookmarkStarFill
          className={`bookmark ${vibration}`}
          style={{color: isBookmarked ? "#e03131" : "#495057"}}
          onClick={handleBookmarkClick}
        />
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
