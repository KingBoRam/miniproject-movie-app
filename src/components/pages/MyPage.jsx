import {useEffect, useState} from "react";
import "./MyPage.css";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import MovieCard from "../movies/MovieCard";
import {useSelector} from "react-redux";
import axios from "../../api/axios";

const MyPage = () => {
  const [name, setName] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState(null);
  const bookmark = useSelector((state) => {
    return state.bookmark;
  });
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || user.email);
        setPhoto(user.photoURL || "./images/blue.png");
        setEmail(user.email);
      } else {
        navigate("/signin");
      }
    });
  }, [auth, navigate]);

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    if (bookmark.length > 0) {
      bookmark.forEach((item) => {
        axios.get(`/movie/${item}`).then((res) => {
          setMovieList((prev) => [...prev, res.data]);
        });
      });
    }
  }, [bookmark]);

  return (
    <>
      <div className="mypage-content">
        <div className="mypage-container">
          <img src={photo} alt="User Profile" className="mypage-img" />
          <div className="mypage-description">
            <h1 className="mypage-name">{name}</h1>
            <p className="mypage-email">{email}</p>
          </div>
        </div>
      </div>
      <div className="mypage-bookmark">
        <h2>북마크</h2>
        <div className="mypage-bookmark-list">
          {movieList.map((item) => (
            <MovieCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPage;
