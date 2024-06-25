import "./Nav.css";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfoToFirebase, userSignOutToFirebase} from "../../../firebase";
import {setUserName} from "../store/userNameSlice";
import {toggleTheme} from "../store/themeSlice";
import {LuUser2} from "react-icons/lu";
import {CiLight} from "react-icons/ci";
import {MdDarkMode} from "react-icons/md";
import {MdLocalMovies} from "react-icons/md";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = useSelector((state) => state.userName);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  useEffect(() => {
    getUserInfoToFirebase((user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        const displayNameOrEmail = user.displayName || user.email;
        dispatch(setUserName(displayNameOrEmail));
      }
    });
  }, [dispatch]);

  const handleSignOut = () => {
    userSignOutToFirebase();
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme("dark"));
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  return (
    <div className={`nav-container ${isDarkMode ? "dark-nav" : "light-nav"}`}>
      <div
        className="nav-logo-container"
        onClick={() => {
          navigate("/");
        }}>
        <MdLocalMovies className="nav-logo" />{" "}
        <div className="nav-logo-text">The movies</div>
      </div>
      <div
        className={`${isDarkMode ? "dark-input-container" : "nav-search-container"}`}>
        <input
          className={`${isDarkMode ? "dark-input" : "nav-search-input"}`}
          type="text"
          placeholder=" 찾고 싶은 영화를 검색해주세요."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="nav-button-container">
        {isLoggedIn ? (
          <div className="nav-user">
            <p className="nav-user-name">{userName}님</p>
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="user img"
                className="nav-user-image"
              />
            ) : (
              <div className="ha">
                <LuUser2 className="ha-ha" />
              </div>
            )}
            <div className="dropOut">
              <button className="nav-button-dropout" onClick={handleSignOut}>
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
                navigate("/agree");
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
        {!isDarkMode ? (
          <MdDarkMode className="theme-icon" onClick={handleThemeToggle} />
        ) : (
          <CiLight className="theme-icon" onClick={handleThemeToggle}></CiLight>
        )}
      </div>
    </div>
  );
};

export default Nav;
