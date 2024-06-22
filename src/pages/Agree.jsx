import {useEffect, useState} from "react";
import Logo from "../components/common/Logo";
import "./Agree.css";
import {useNavigate} from "react-router-dom";
import AgreeText from "../dummyData/AgreeText.txt";
import AgreeText2 from "../dummyData/AgreeText2.txt";

const Agree = () => {
  const [allCheck, setAllCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [localeCheck, setlocaleCheck] = useState(false);
  const [agreeText, setAgreeText] = useState("");
  const [agreeText2, setAgreeText2] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(AgreeText)
      .then((response) => response.text())
      .then((text) => setAgreeText(text));
    fetch(AgreeText2)
      .then((response) => response.text())
      .then((text) => setAgreeText2(text));
  }, []);

  const allBtnEvent = () => {
    setAllCheck((prev) => !prev);
    setUseCheck((prev) => !prev);
    setlocaleCheck((prev) => !prev);
  };

  const useBtnEvent = () => {
    setUseCheck((prev) => !prev);
  };

  const localeBtnEvent = () => {
    setlocaleCheck((prev) => !prev);
  };

  useEffect(() => {
    if (localeCheck === true && useCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [localeCheck, useCheck]);

  const moveToSignup = () => {
    if (useCheck === true) {
      navigate("/signup");
    } else {
      alert("필수동의 사항을 체크해주세요.");
    }
  };

  return (
    <div className="agree-container">
      <div className="agree-logo-content">
        <Logo className="agree-logo" />
      </div>
      <div>
        <div className="customCheckboxWrapper">
          <input
            className="customCheckbox"
            type="checkbox"
            id="all-check"
            checked={allCheck}
            onChange={allBtnEvent}></input>
          <label
            className={`customLabel ${allCheck ? "isChecked" : ""}`}
            htmlFor="all-check"></label>
          <label className="agree-all-label" style={{}} htmlFor="all-check">
            전체 동의하기
          </label>
        </div>
        <div className="agree-all-description">
          해당 웹 페이지를 사용하는데 필요한 이용약관(필수), 위치기반서비스
          이용약관(선택)에 모두 동의합니다.
        </div>
      </div>
      <div>
        <div className="customCheckboxWrapper">
          <input
            className="customCheckbox"
            type="checkbox"
            id="use-check"
            checked={useCheck}
            onChange={useBtnEvent}></input>
          <label
            className={`customLabel ${useCheck ? "isChecked" : ""}`}
            htmlFor="use-check"></label>
          <label className="agree-use-label" htmlFor="use-check">
            <span
              style={{
                color: "#228be6",
                fontSize: "0.8rem",
                marginRight: "5px",
              }}>
              [필수]
            </span>
            The Movies 이용약관 동의
          </label>
        </div>
        <textarea
          className="agree-description"
          value={agreeText}
          readOnly></textarea>
      </div>
      <div>
        <div className="customCheckboxWrapper">
          <input
            className="customCheckbox"
            type="checkbox"
            id="locale-check"
            checked={localeCheck}
            onChange={localeBtnEvent}></input>
          <label
            className={`customLabel ${localeCheck ? "isChecked" : ""}`}
            htmlFor="locale-check"></label>
          <label className="agree-use-label" htmlFor="locale-check">
            <span
              style={{
                color: "#868e96",
                fontSize: "0.8rem",
                marginRight: "5px",
              }}>
              [선택]
            </span>
            위치기반서비스 이용약관 동의
          </label>
        </div>
        <textarea
          className="agree-description"
          value={agreeText2}
          readOnly></textarea>
      </div>
      <button className="agree-button" onClick={moveToSignup}>
        다 음
      </button>
    </div>
  );
};

export default Agree;
