import "./SignUp.css";

const SignUp = () => {
  return (
    <form className="signup-form">
      <div className="signup-text">가입을 환영합니다.</div>
      <div className="signup-container">
        <label className="signup-label" htmlFor="name">
          이름 :
        </label>
        <input
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
          className="signup-input"
          type="email"
          name="email"
          id="email"></input>
      </div>
      <div className="signup-container">
        <label
          className="signup-label"
          htmlFor="password"
          name="password"
          id="password">
          비밀번호 :
        </label>
        <input className="signup-input" type="password"></input>
      </div>
      <div className="signup-container">
        <label className="signup-label" htmlFor="email-confirm">
          비밀번호 확인 :
        </label>
        <input
          className="signup-input"
          type="password"
          name="email-comfirm"
          id="email-confirm"></input>
      </div>

      <button className="signup-button" type="submit">
        회 원 가 입
      </button>
    </form>
  );
};

export default SignUp;