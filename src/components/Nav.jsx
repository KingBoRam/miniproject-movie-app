import {SiThemoviedatabase} from "react-icons/si";
import "./Nav.css";
import {useNavigate} from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <SiThemoviedatabase
        className="nav-logo"
        onClick={() => {
          navigate("/");
        }}
      />
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
