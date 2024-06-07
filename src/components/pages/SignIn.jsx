import "./SignIn.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../../firebase";
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {validateEmail} from "../utils/validateEmail";

const SignIn = () => {
  const [input, setInput] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const auth = getAuth(app);

  const handleSignin = (e) => {
    e.preventDefault();
    const email = validateEmail(emailRef.current.value);
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (errorCode.includes("invalid-credential")) {
          setInput("⚠️ 이메일 혹은 비밀번호가 틀렸습니다.");
        } else if (errorCode.includes("invalid-email")) {
          setInput("⚠️ 이메일을 제대로 입력해주세요.");
        } else if (email === null) {
          setInput("⚠️ 이메일 형식을 확인해주세요.");
        }
      });
  };

  const handleGoogleSignin = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user, token);
      })
      .catch((error) => {
        if (error.length > 0) {
          setInput("⚠️ 구글을 통한 로그인에 실패했습니다.");
        }
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === "/signin") {
          navigate("/");
        }
      }
    });
  }, [auth, navigate, pathname]);

  return (
    <form className="signin-form" onSubmit={handleSignin}>
      <div className="signin-text">방문을 환영합니다.</div>
      <div className="signin-container">
        <label className="signin-label" htmlFor="email">
          이메일 :
        </label>
        <input
          ref={emailRef}
          className="signin-input"
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
          className="signin-input"
          type="password"></input>
      </div>
      <div className="signin-error-message">{input}</div>
      <button className="signin-button" type="submit">
        이메일 로그인
      </button>
      <button className="signin-button" onClick={handleGoogleSignin}>
        <FcGoogle className="google-logo" /> 구글 로그인
      </button>
    </form>
  );
};

export default SignIn;
