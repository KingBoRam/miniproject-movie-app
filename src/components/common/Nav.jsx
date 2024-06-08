import "./Nav.css";
import {useNavigate} from "react-router-dom";
import {MdLocalMovies} from "react-icons/md";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import app from "../../firebase";
import {LuUser2} from "react-icons/lu";

const Nav = () => {
  const [value, setValue] = useState("");
  const [user, setUser] = useState("");

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
      }
    });
  }, [auth]);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        setLoginState(false);
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
          window.location.replace("/");
        }}>
        <MdLocalMovies className="nav-logo" />{" "}
        <div className="nav-logo-text">The movies</div>
      </div>
      <div className="nav-search-container">
        <input
          type="text"
          placeholder=" 찾고 싶은 영화를 검색해주세요."
          className="nav-search-input"
          value={value}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="nav-button-container">
        {loginState ? (
          <div className="nav-user">
            <p className="nav-user-name">{user.displayName || user.email}님</p>
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
