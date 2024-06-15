import "./SignUp.css";
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {emailSignUpToFirebase, getUserInfoToFirebase} from "../../firebase";
import {validateEmail} from "../utils/validateEmail";

const SignUp = () => {
  const [input, setInput] = useState("");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmpasswordRef = useRef(null);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const emailPasswordSignup = (e) => {
    e.preventDefault();
    const email = validateEmail(emailRef.current?.value);
    const password = passwordRef.current?.value;
    const confirmPassword = confirmpasswordRef.current?.value;
    const comparison = password?.trim() === confirmPassword?.trim();
    // 여기 분리해보는게 좋을거같다.
    if (email === null) {
      setInput("⚠️ 이메일 형식을 확인해주세요.");
      return;
    }
    if (!comparison) {
      setInput("⚠️ 입력하신 두개의 비밀번호가 일치하지 않습니다.");
      return;
    } else {
      emailSignUpToFirebase(email, password)
        .then(() => {
          navigate("/signin");
        })
        .catch((error) => {
          if (error.code.includes("email-already-in-use")) {
            setInput("⚠️ 이미 존재하는 이메일입니다.");
          }
        });
    }
  };

  useEffect(() => {
    getUserInfoToFirebase((user) => {
      if (user) {
        if (pathname === "/signup") {
          navigate("/");
        }
      }
    });
  }, [navigate, pathname]);

  return (
    <form className="signup-form" onSubmit={emailPasswordSignup}>
      <div className="signup-text">가입을 환영합니다.</div>
      <div className="signup-container">
        <label className="signup-label" htmlFor="name">
          이름 :
        </label>
        <input
          ref={nameRef}
          required
          className={isDarkMode ? "singup-input-dark" : "signup-input"}
          type="text"
          name="name"
          id="name"></input>
      </div>
      <div className="signup-container">
        <label className="signup-label" htmlFor="email">
          이메일 :
        </label>
        <input
          ref={emailRef}
          required
          className={isDarkMode ? "singup-input-dark" : "signup-input"}
          type="email"
          name="email"
          id="email"></input>
      </div>
      <div className="signup-container">
        <label className="signup-label" htmlFor="password">
          비밀번호 :
        </label>
        <input
          ref={passwordRef}
          required
          className={isDarkMode ? "singup-input-dark" : "signup-input"}
          id="password"
          name="password"
          type="password"></input>
      </div>
      <div className="signup-container">
        <label className="signup-label" htmlFor="email-confirm">
          비밀번호 확인 :
        </label>
        <input
          ref={confirmpasswordRef}
          required
          className={isDarkMode ? "singup-input-dark" : "signup-input"}
          type="password"
          name="email-comfirm"
          id="email-confirm"></input>
      </div>
      <div className="signup-error-message">{input}</div>
      <button className="signup-button" type="submit">
        회 원 가 입
      </button>
    </form>
  );
};

export default SignUp;
