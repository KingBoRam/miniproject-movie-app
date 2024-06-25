import "./MyPage.css";
import {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getUserInfoToFirebase} from "../../firebase";
import axios from "../api/axios";
import MovieCard from "../components/movies/MovieCard";
import UserProfile from "../components/common/UserProfile";
import {
  changeBookmarkOrder,
  deleteBookMark,
} from "../components/store/bookmarkSlice";
import {FaTrashCan} from "react-icons/fa6";

const MyPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [uid, setUid] = useState(null);
  const [dragOverElement, setDragOverElement] = useState(null);
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

  const dragItem = useRef(); // 드래그 시작 아이템
  const dragOverItem = useRef(); // 드롭되기 전에 그 아래에 위치한 아이템

  const dragStart = (e, idx) => {
    dragItem.current = idx;
  };

  const dragEnter = (e, idx) => {
    setDragOverElement(e.target); // 드래그된 요소를 저장
    dragOverItem.current = idx;
  };

  const drop = () => {
    if (dragOverElement?.classList.contains("mypage-trash-hover-area")) {
      // 휴지통 아이콘 위에 드롭된 경우
      const newList = [...movieList];
      newList.splice(dragItem.current, 1); // 해당 요소 제거
      setMovieList(newList);
      const newOrder = newList.map((item) => item.id);
      dispatch(changeBookmarkOrder({uid, newOrder}));
    } else {
      // 일반적인 드래그 앤 드롭 처리
      setMovieList([]);
      const newList = [...movieList];
      const dragItemValue = newList[dragItem.current];
      newList.splice(dragItem.current, 1);
      newList.splice(dragOverItem.current, 0, dragItemValue);
      dragItem.current = null;
      dragOverItem.current = null;
      setMovieList(newList);
      // 숫자로 저장이 되면서 드롭하고나면 디테일 페이지에서 숫자형을 못받아오고 있었다..
      const newOrder = newList.map((item) => String(item.id));
      dispatch(changeBookmarkOrder({uid, newOrder}));
    }
  };

  return (
    <div className="mypage-container">
      <UserProfile />
      <div className="mypage-content"></div>
      <div className="mypage-bookmark">
        <div className="mypage-text-content">
          <h2 className="mypage-h2">북마크</h2>
          <div className="mypage-trash-wrapper">
            <FaTrashCan className="mypage-trash" />
            <div
              className="mypage-trash-hover-area"
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => dragEnter(e)}
              onDragEnd={drop}></div>
          </div>
        </div>
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
