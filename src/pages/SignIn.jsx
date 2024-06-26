import "./SignIn.css";
import {useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {
  emailSignInToFirebase,
  getUserInfoToFirebase,
  googleSignInToFirebase,
} from "../../firebase";
import {validateEmail} from "../utils/validateEmail";
import {FcGoogle} from "react-icons/fc";
import Logo from "../components/common/Logo";

const SignIn = () => {
  const [input, setInput] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const emailPasswordSignin = (e) => {
    e.preventDefault();
    const email = validateEmail(emailRef.current.value);
    const password = passwordRef.current.value;
    emailSignInToFirebase(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode.includes("invalid-credential")) {
          setInput("⚠️ 이메일 혹은 비밀번호가 틀렸습니다.");
        } else if (errorCode.includes("invalid-email")) {
          setInput("⚠️ 이메일을 제대로 입력해주세요.");
        } else if (email === null) {
          setInput("⚠️ 이메일 형식을 확인해주세요.");
        }
      });
  };

  const googleOAuthSignin = (e) => {
    e.preventDefault();
    googleSignInToFirebase().catch((error) => {
      if (error.length > 0) {
        setInput("⚠️ 구글을 통한 로그인에 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    getUserInfoToFirebase((user) => {
      if (user) {
        if (pathname === "/signin") {
          navigate("/");
        }
      }
    });
  }, [navigate, pathname]);

  return (
    <form className="signin-form" onSubmit={emailPasswordSignin}>
      <Logo></Logo>
      <div className="signin-container">
        <label htmlFor="email">이메일 :</label>
        <input
          ref={emailRef}
          className={isDarkMode ? "signin-dark-input" : "signin-input"}
          type="email"
          name="email"
          id="email"></input>
      </div>
      <div className="signin-container">
        <label
          className="signin-label"
          htmlFor="password"
          name="password"
          id="password">
          비밀번호 :
        </label>
        <input
          ref={passwordRef}
          className={isDarkMode ? "signin-dark-input" : "signin-input"}
          type="password"></input>
      </div>
      <div className="signin-error-message">{input}</div>
      <button className="signin-button" type="submit">
        이메일 로그인
      </button>
      <button className="signin-button" onClick={googleOAuthSignin}>
        <FcGoogle className="google-logo" /> 구글 로그인
      </button>
    </form>
  );
};

export default SignIn;
