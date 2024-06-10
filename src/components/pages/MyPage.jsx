import {useEffect, useState} from "react";
import "./MyPage.css";
import {getAuth, onAuthStateChanged, updateProfile} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import MovieCard from "../movies/MovieCard";
import {useDispatch, useSelector} from "react-redux";
import axios from "../../api/axios";
import {setUserName} from "../store/userNameSlice";

const MyPage = () => {
  const [name, setName] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState(null);
  const bookmark = useSelector((state) => {
    return state.bookmark;
  });
  const userName = useSelector((state) => {
    return state.userName;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const asd = user.displayName || user.email;
        setName(user.displayName || user.email);
        setPhoto(user.photoURL || "./images/blue.png");
        setEmail(user.email);
        dispatch(setUserName(asd));
      } else {
        navigate("/signin");
      }
    });
  }, [auth, navigate, dispatch]);

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

  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        setEdit(false);
        dispatch(setUserName(auth.currentUser.displayName));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [editImg, setEditImg] = useState(false);

  const handleEditImg = () => {
    updateProfile(auth.currentUser, {
      photoURL: photo,
    })
      .then(() => {
        setEditImg(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="mypage-content">
        <div className="mypage-container">
          <img src={photo} alt="User Profile" className="mypage-img" />
          <div className="mypage-description">
            {edit === false ? (
              <div className="name-container">
                <h1 className="mypage-name">{userName}</h1>{" "}
                <button
                  className="mypage-edit-btn"
                  onClick={() => {
                    setEdit((prev) => !prev);
                  }}>
                  수정
                </button>
              </div>
            ) : (
              <>
                <input
                  className="edit-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}></input>
                <button className="mypage-edit-btn" onClick={handleEdit}>
                  완료
                </button>
                <button
                  className="mypage-edit-btn"
                  onClick={() => {
                    setEdit(false);
                  }}>
                  취소
                </button>
              </>
            )}

            <p className="mypage-email">{email}</p>

            {editImg ? (
              <>
                <input
                  placeholder="이미지 url을 입력해주세요."
                  className="edit-input"
                  type="text"
                  onChange={(e) => {
                    setPhoto(e.target.value);
                  }}></input>
                <button className="mypage-edit-btn" onClick={handleEditImg}>
                  완료
                </button>
                <button
                  className="mypage-edit-btn"
                  onClick={() => {
                    setEditImg(false);
                  }}>
                  취소
                </button>
              </>
            ) : (
              <button
                className="mypage-edit-btn profile-edit-btn"
                onClick={() => {
                  setEditImg(true);
                }}>
                프로필 이미지 수정
              </button>
            )}
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
