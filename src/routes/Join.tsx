import axios from "axios";
import React, { useState } from "react";
import style from "./Join.module.scss";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // 오류메세지, 유효여부 상태 저장
  const [requiredMessage, setRequiredMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [isUsernameFocus, setIsUsernameFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isNicknameFocus, setIsNicknameFocus] = useState(false);
  const [isPhoneFocus, setIsPhoneFocus] = useState(false);

  const [isSecretPassword, setIsSecretPassword] = useState(true);

  const navigate = useNavigate();

  // console.log("location", location);

  const onSubmit = async (e: any) => {
    e.preventDefault();
      try {
        const response = await (await fetch("http://localhost:8080/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: username,
            userName: nickname,
            userPwd: password,
            userEmail: "ex@naver.com",
            userPh: phone,
            userZipcode: "01",
            userAddress1: "서울시",
            userAddress2: "강남구"
          })
        }));

        if(response.status !== 200) {
          
        }
      } catch (err: any) {
        console.log(err);
      }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === "username") {
      setUsername(value);
      const usernameRegExp = /^[a-zA-z0-9]{4,16}$/;
      if (!usernameRegExp.test(username)) {
        setRequiredMessage(
          "아이디: 4-16사이 대소문자 또는 숫자만 입력해 주세요."
        );
        setIsUsernameValid(false);
      } else {
        setRequiredMessage("");
        setIsUsernameValid(true);
      }
    } else if (e.target.name === "password") {
      setPassword(value);
      const passwordRegExp =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      if (!passwordRegExp.test(password)) {
        setRequiredMessage(
          "비밀번호: 숫자+영문자+특수문자 조합으로 8자리 이상 25자리 이하로 입력해주세요."
        );
        setIsPasswordValid(false);
        console.log(isPasswordValid);
      } else {
        setRequiredMessage("");
        setIsPasswordValid(true);
      }
    } else if (e.target.name === "email") {
      setEmail(value);
    } else if (e.target.name === "phone") {
      setPhone(value);
    } else if (e.target.name === "nickname") {
      setNickname(value);
    } else {
      return;
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setIsUsernameFocus(true);
      setIsPasswordFocus(false);
      setIsPhoneFocus(false);
      setIsNicknameFocus(false);
    } else if (e.target.name === "email") {
      setIsUsernameFocus(false);
      setIsPasswordFocus(false);
      setIsPhoneFocus(false);
      setIsNicknameFocus(false);
    } else if (e.target.name === "password") {
      setIsPasswordFocus(true);
      setIsUsernameFocus(false);
      setIsPhoneFocus(false);
      setIsNicknameFocus(false);
    } else if (e.target.name === "phone") {
      setIsPhoneFocus(true);
      setIsUsernameFocus(false);
      setIsPasswordFocus(false);
      setIsNicknameFocus(false);
    } else if (e.target.name === "nickname") {
      setIsNicknameFocus(true);
      setIsUsernameFocus(false);
      setIsPasswordFocus(false);
      setIsPhoneFocus(false);
    } else {
      return;
    }
  };

  const onClickPasswordShow = (e: React.MouseEvent) => {
    setIsSecretPassword(!isSecretPassword);
  };

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <div className={style.input_wrapper}>
        <div
          className={classnames(
            style.wrapper_username,
            { [style.is_error]: !isUsernameValid },
            { [style.is_focus]: isUsernameFocus }
          )}
        >
          <input
            onChange={onChange}
            onFocus={onFocus}
            name="username"
            type="text"
            placeholder="아이디"
            value={username}
            className={style.input}
            maxLength={20}
            required
          />
        </div>
        <div
          className={classnames(
            style.wrapper_password,
            { [style.is_error]: !isPasswordValid },
            { [style.is_focus]: isPasswordFocus }
          )}
        >
          <input
            onChange={onChange}
            onFocus={onFocus}
            name="password"
            type={isSecretPassword ? "password" : "text"}
            placeholder="비밀번호"
            value={password}
            maxLength={20}
            className={style.input}
            required
          />
          <div className={style.password_info}>
            <button
              type="button"
              className={classnames(style.btn_show, {
                [style.is_hide]: !isSecretPassword,
              })}
              onClick={onClickPasswordShow}
            >
              <span className="blind">비밀번호 숨기기</span>
            </button>
          </div>
        </div>
        <div
          className={classnames(style.wrapper_nickname, {
            [style.is_focus]: isNicknameFocus,
          })}
        >
          <input
            onChange={onChange}
            onFocus={onFocus}
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임"
            className={style.input}
            value={nickname}
          />
        </div>
        <div
          className={classnames(style.wrapper_phone, {
            [style.is_focus]: isPhoneFocus,
          })}
        >
          <input
            onChange={onChange}
            onFocus={onFocus}
            id="phone"
            name="phone"
            type="text"
            placeholder="휴대전화번호"
            className={style.input}
            value={phone}
          />
        </div>
      </div>
      {requiredMessage !== "" ? (
        <strong className={style.error_text} role="alert">
          {requiredMessage}
        </strong>
      ) : null}
      {selectedMessage !== "" ? (
        <strong className={style.error_text} role="alert">
          {selectedMessage}
        </strong>
      ) : null}
      <div className={classnames(style.btn_submit, !isUsernameValid || !isPasswordValid && style.is_dimmed)}>
        <input type="submit" value={isLoading ? "처리 중 ..." : "회원가입"} />
      </div>
    </form>
  );
};

export default Join;