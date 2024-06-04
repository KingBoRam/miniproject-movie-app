import "./SignIn.css";

const SignIn = () => {
  return (
    <form className="signin-form">
      <div className="signin-container">
        <label className="signin-label" htmlFor="email">
          이메일 :
        </label>
        <input
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
        <input className="signin-input" type="password"></input>
      </div>

      <div className="signin-container">
        <button className="signin-button" type="submit">
          로 그 인
        </button>
      </div>
    </form>
  );
};

export default SignIn;
