import "./MyPage.css";
import {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getUserInfoToFirebase} from "../../firebase";
import axios from "../api/axios";
import MovieCard from "../components/movies/MovieCard";
import UserProfile from "../components/common/UserProfile";
import {changeBookmarkOrder} from "../components/store/bookmarkSlice";

const MyPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [uid, setUid] = useState(null);
  const bookmark = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfoToFirebase((user) => {
      setUid(user.uid);
    });
  }, []);

  useEffect(() => {
    if (bookmark.length > 0) {
      const user = bookmark.find((item) => item.uid === uid);
      const userBookmark = user?.bookmark;
      setMovieList([]);
      userBookmark?.forEach((item) => {
        axios.get(`/movie/${item}`).then((res) => {
          setMovieList((prev) => [...prev, res.data]);
        });
      });
    }
  }, [bookmark, uid]);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, idx) => {
    dragItem.current = idx;
  };

  const dragEnter = (e, idx) => {
    dragOverItem.current = idx;
  };

  const drop = () => {
    setMovieList([]);
    const newList = [...movieList];
    const dragItemValue = newList[dragItem.current];
    newList.splice(dragItem.current, 1);
    newList.splice(dragOverItem.current, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;
    setMovieList(newList);
    // Update the bookmark order in the store
    const newOrder = newList.map((item) => item.id);
    dispatch(changeBookmarkOrder({uid, newOrder}));
  };

  return (
    <div className="mypage-container">
      <UserProfile />
      <div className="mypage-content"></div>
      <div className="mypage-bookmark">
        <h2 className="mypage-h2">북마크</h2>
        <div className="mypage-bookmark-list">
          {movieList.map((item, idx) => (
            <MovieCard
              key={item.id}
              item={item}
              draggable
              onDragStart={(e) => dragStart(e, idx)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => dragEnter(e, idx)}
              onDragEnd={drop}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
