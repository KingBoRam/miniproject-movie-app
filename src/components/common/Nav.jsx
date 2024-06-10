import "./Nav.css";
import {useNavigate} from "react-router-dom";
import {MdLocalMovies} from "react-icons/md";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import app from "../../../firebase";
import {LuUser2} from "react-icons/lu";
import {useDispatch, useSelector} from "react-redux";
import {setUserName} from "../store/userNameSlice";

const Nav = () => {
  const [value, setValue] = useState("");
  const [user, setUser] = useState("");
  const userName = useSelector((state) => {
    return state.userName;
  });
  const dispatch = useDispatch();
  const [loginState, setLoginState] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginState(true);
        setUser(user);
        const asd = user.displayName || user.email;
        dispatch(setUserName(asd));
      }
    });
  }, [auth, dispatch]);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        setLoginState(false);
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
        alert("로그아웃에 실패했습니다.");
      });
  };

  return (
    <div className="nav-container">
      <div
        className="nav-logo-container"
        onClick={() => {
          // window.location.replace("/");
          navigate("/");
        }}>
        <MdLocalMovies className="nav-logo" />{" "}
        <div className="nav-logo-text">The movies</div>
      </div>
      <div className="nav-search-container">
        <input
          type="text"
          placeholder=" 찾고 싶은 영화를 검색해주세요❣️"
          className="nav-search-input"
          value={value}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="nav-button-container">
        {loginState ? (
          <div className="nav-user">
            <p className="nav-user-name">{userName}님</p>
            {user.photoURL !== null ? (
              <img
                src={user.photoURL}
                alt="user img"
                className="nav-user-image"
              />
            ) : (
              <div className="ha">
                <LuUser2 className="ha-ha" />
              </div>
            )}
            <div className="dropOut">
              <button className="nav-button-dropout" onClick={handleSignout}>
                로그아웃
              </button>
              <button
                className="nav-button-dropout"
                onClick={() => {
                  navigate("/mypage");
                }}>
                마이페이지
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              className="nav-button"
              onClick={() => {
                navigate("/signup");
              }}>
              회원가입
            </button>
            <span className="nav-button">/</span>
            <button
              className="nav-button"
              onClick={() => {
                navigate("/signin");
              }}>
              로그인
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
