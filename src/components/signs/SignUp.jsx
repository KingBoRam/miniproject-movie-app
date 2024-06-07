import {useEffect, useRef, useState} from "react";
import "./SignUp.css";
import app from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
  const [input, setInput] = useState("");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmpasswordRef = useRef(null);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmpasswordRef.current?.value;

    if (password?.trim() === confirmPassword?.trim()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/signin");
        })
        .catch((error) => {
          console.error(error.code);
          console.error(error.message);
          if (error.code.includes("email-already-in-use")) {
            setInput("⚠️ 이미 존재하는 이메일입니다.");
          }
        });
    } else {
      setInput("⚠️ 입력하신 두개의 비밀번호가 일치하지 않습니다.");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, [auth, navigate]);

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <div className="signup-text">가입을 환영합니다.</div>
      <div className="signup-container">
        <label className="signup-label" htmlFor="name">
          이름 :
        </label>
        <input
          ref={nameRef}
          required
          className="signup-input"
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
          className="signup-input"
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
          className="signup-input"
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
          className="signup-input"
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
