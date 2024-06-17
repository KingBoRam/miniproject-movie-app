import "./MyPage.css";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getUserInfoToFirebase} from "../../firebase";
import axios from "../api/axios";
import MovieCard from "../components/movies/MovieCard";
import UserProfile from "../components/common/UserProfile";

const MyPage = () => {
  const [movieList, setMovieList] = useState([]);

  const [uid, setUid] = useState(null);
  const bookmark = useSelector((state) => {
    return state.bookmark;
  });

  useEffect(() => {
    getUserInfoToFirebase((user) => {
      setUid(user.uid);
    });
    if (bookmark.length > 0) {
      const user = bookmark.find((item) => item.uid === uid);
      const userBookmark = user?.bookmark;
      userBookmark?.forEach((item) => {
        axios.get(`/movie/${item}`).then((res) => {
          setMovieList((prev) => [...prev, res.data]);
        });
      });
    }
  }, [bookmark, uid]);

  return (
    <>
      <UserProfile />
      <div className="mypage-content"></div>
      <div className="mypage-bookmark">
        <h2 className="mypage-h2">북마크</h2>
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
