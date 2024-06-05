import "./Nav.css";
import {useNavigate} from "react-router-dom";
import {MdLocalMovies} from "react-icons/md";
import {useState} from "react";

const Nav = () => {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
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
      </div>
    </div>
  );
};

export default Nav;
