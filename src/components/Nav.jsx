import "./Nav.css";
import {useNavigate} from "react-router-dom";
import {MdLocalMovies} from "react-icons/md";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <div
        className="nav-logo-container"
        onClick={() => {
          navigate("/");
        }}>
        <MdLocalMovies className="nav-logo" /> The movies
      </div>

      <div className="nav-button-container">
        <button
          className="nav-button"
          onClick={() => {
            navigate("/signup");
          }}>
          회원가입
        </button>
        <span>/</span>
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
