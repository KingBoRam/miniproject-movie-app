import {useEffect, useState} from "react";
import "./MovieDetail.css";
import {useParams} from "react-router-dom";
import axios from "../../api/axios";
import {GoStarFill} from "react-icons/go";
import {BsFillBookmarkStarFill} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {addbookmark, deletebookmark} from "../store/bookmarkSlice";
import {getUserInfo} from "../../../firebase";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [uid, setUid] = useState(null);
  const bookmark = useSelector((state) => {
    return state.bookmark;
  });
  console.log(bookmark);
  const dispatch = useDispatch();
  const param = useParams();

  // https://velog.io/@rgfdds98/debuging-React-Hook-useEffect-has-a-missing-dependency-fetchMovieData.-Either-include-it-or-remove-the-dependency-array
  useEffect(() => {
    axios.get(`/movie/${param.id}`).then((res) => setMovieDetail(res.data));
  }, [param]);

  useEffect(() => {
    getUserInfo((user) => {
      setUid(user.uid);
    });
  });

  const handleBookmarkClick = () => {
    getUserInfo((user) => {
      if (!user) {
        alert("로그인이 필요한 기능입니다.");
      } else {
        setIsBookmarked(!isBookmarked);
        if (isBookmarked === true) {
          dispatch(deletebookmark());
        } else {
          const paramId = param.id;
          dispatch(addbookmark({uid, paramId}));
        }
      }
    });
  };

  useEffect(() => {
    if (bookmark.includes(param.id)) {
      setIsBookmarked(true);
    }
  }, [bookmark, param]);

  return (
    <div className="detail-container">
      <BsFillBookmarkStarFill
        className="bookmark"
        style={{color: isBookmarked ? "#e03131" : "black"}}
        onClick={handleBookmarkClick}
      />
      <img
        className="detail-poster"
        src={
          movieDetail.backdrop_path === null ||
          movieDetail.backdrop_path === "" ||
          movieDetail.backdrop_path === undefined
            ? "/images/blue.png"
            : `https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`
        }></img>
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
