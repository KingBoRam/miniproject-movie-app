import "./UserProfile.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUserName} from "../store/userNameSlice";
import {
  getUserInfoToFirebase,
  updateUserProfileToFirebase,
} from "../../../firebase";

const UserProfile = () => {
  const [name, setName] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState(null);
  const [editName, setEditName] = useState(false);
  const [editImg, setEditImg] = useState(false);
  const userName = useSelector((state) => {
    return state.userName;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfoToFirebase((user) => {
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
  }, [navigate, dispatch]);

  const handleEditName = () => {
    updateUserProfileToFirebase({
      displayName: name,
    })
      .then(() => {
        setEditName(false);
        dispatch(setUserName(name));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditImg = () => {
    updateUserProfileToFirebase({
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
    <div className="userProfile-container">
      <img src={photo} alt="User Profile image" className="userProfile-img" />
      <div className="userProfile-description">
        {editName === false ? (
          <div className="userProfile-name-container">
            <h1 className="userProfile-name">{userName}</h1>{" "}
            <button
              className="userProfile-edit-btn nickname"
              onClick={() => {
                setEditName((prev) => !prev);
              }}>
              닉네임 수정
            </button>
          </div>
        ) : (
          <div className="userProfile-edit">
            <input
              className="userProfile-edit-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}></input>
            <button className="userProfile-edit-btn " onClick={handleEditName}>
              완료
            </button>
            <button
              className="userProfile-edit-btn "
              onClick={() => {
                setEditName(false);
              }}>
              취소
            </button>
          </div>
        )}
        <p className="userProfile-email">{email}</p>
        {editImg ? (
          <div className="userProfile-edit">
            <input
              className="userProfile-edit-input"
              placeholder="이미지 url을 입력해주세요."
              type="text"
              onChange={(e) => {
                setPhoto(e.target.value);
              }}></input>
            <button className="userProfile-edit-btn" onClick={handleEditImg}>
              완료
            </button>
            <button
              className="userProfile-edit-btn"
              onClick={() => {
                setEditImg(false);
              }}>
              취소
            </button>
          </div>
        ) : (
          <button
            className="userProfile-edit-btn profile-edit-btn"
            onClick={() => {
              setEditImg(true);
            }}>
            프로필 이미지 수정
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
