import React, { useState } from "react";
import style from "./Join.module.scss";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import DaumPostcode from "react-daum-postcode";

const Join = () => {
  const [jointitle, setJointitle] = useState<string>("회원가입");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [emailLeft, setEmailLeft] = useState<string>("");
  const [emailRight, setEmailRight] = useState<string>("");

  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  // 오류메세지, 유효여부 상태 저장
  const [requiredMessage, setRequiredMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [isUsernameFocus, setIsUsernameFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isConfirmPasswordFocus, setIsConfirmPasswordFocus] = useState(false);
  const [isNicknameFocus, setIsNicknameFocus] = useState(false);
  const [isPhoneFocus, setIsPhoneFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isZipcodeFocus, setIsZipcodeFocus] = useState(false);
  const [isAddress1Focus, setIsAddress1Focus] = useState(false);
  const [isAddress2Focus, setIsAddress2Focus] = useState(false);
  const [isSecretPassword, setIsSecretPassword] = useState(true);

  const EMAIL_API_KEY = "KGZrbSZ7tBtuPO4Ql";
  const domains = ["naver.com", "gmail.com", "daum.net"];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // console.log("location", location);

  const handleEmailVerification = async () => {
    const templateParams = {
      to_email: email,
      from_name : "vitabuddy",
      code: "22"
    };

    try {
      await emailjs.send(
        'vitabuddy',
        'vitabuddy',
        templateParams,
        EMAIL_API_KEY,
      );
      setIsEmailSent(true);
    } catch(e) {
      console.log(e);
    }
  }
  // 우편번호 검색 팝업 수정
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setZipcode(data.zonecode);
    setAddress1(fullAddress);
    setPopup(false);
  };

  const togglePopup = () => {
    setPopup(!popup);
  };

  const handleDomainSelect = (domain: string) => {
    setEmailRight(domain);
    setIsDropdownOpen(false);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: username,
          userName: nickname,
          userPwd: password,
          userEmail: email,
          userPh: phone,
          userZipcode: zipcode,
          userAddress1: address1,
          userAddress2: address2,
        }),
      });

      if (response.status !== 200) {
      } else {
        setRequiredMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (err: any) {
      console.log(err);
      setRequiredMessage("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
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
    } else if (e.target.name === "zipcode") {
      setZipcode(value);
    } else if (e.target.name === "address1") {
      setAddress1(value);
    } else if (e.target.name === "address2") {
      setAddress2(value);
    } else {
      return;
    }
  };

  const onCheckUsername = async () => {
    if (!username.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("/api/check-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.isAvailable) {
          alert("사용 가능한 아이디입니다.");
        } else {
          alert("이미 사용 중인 아이디입니다.");
        }
      } else {
        alert("아이디 확인 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error checking username:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setIsUsernameFocus(true);
      setIsPasswordFocus(false);
      setIsPhoneFocus(false);
      setIsNicknameFocus(false);
      setIsZipcodeFocus(false);
      setIsAddress1Focus(false);
      setIsAddress2Focus(false);
    } else if (e.target.name === "email") {
      setIsEmailFocus(true);
      setIsUsernameFocus(false);
      setIsPasswordFocus(false);
      setIsPhoneFocus(false);
      setIsNicknameFocus(false);
      setIsZipcodeFocus(false);
      setIsAddress1Focus(false);
      setIsAddress2Focus(false);
    } else if (e.target.name === "password") {
      setIsPasswordFocus(true);
      setIsUsernameFocus(false);
      setIsPhoneFocus(false);
      setIsNicknameFocus(false);
      setIsZipcodeFocus(false);
      setIsAddress1Focus(false);
      setIsAddress2Focus(false);
    } else if (e.target.name === "phone") {
      setIsPhoneFocus(true);
      setIsUsernameFocus(false);
      setIsPasswordFocus(false);
      setIsNicknameFocus(false);
      setIsZipcodeFocus(false);
      setIsAddress1Focus(false);
      setIsAddress2Focus(false);
    } else if (e.target.name === "nickname") {
      setIsNicknameFocus(true);
      setIsUsernameFocus(false);
      setIsPasswordFocus(false);
      setIsPhoneFocus(false);
      setIsZipcodeFocus(false);
      setIsAddress1Focus(false);
      setIsAddress2Focus(false);
    } else if (e.target.name === "zipcode") {
      setIsZipcodeFocus(true);
      setIsUsernameFocus(false);
      setIsPasswordFocus(false);
      setIsNicknameFocus(false);
      setIsPhoneFocus(false);
      setIsAddress1Focus(false);
      setIsAddress2Focus(false);
    } else if (e.target.name === "address1") {
      setIsAddress1Focus(true);
      setIsUsernameFocus(false);
      setIsPasswordFocus(false);
      setIsNicknameFocus(false);
      setIsPhoneFocus(false);
      setIsZipcodeFocus(false);
      setIsAddress2Focus(false);
    } else if (e.target.name === "address2") {
      setIsAddress2Focus(true);
      setIsUsernameFocus(false);
      setIsPasswordFocus(false);
      setIsNicknameFocus(false);
      setIsPhoneFocus(false);
      setIsZipcodeFocus(false);
      setIsAddress1Focus(false);
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
        <h1 className={style.title}>{jointitle}</h1>

        <div
          className={classnames(style.wrapper_nickname, {
            [style.is_focus]: isNicknameFocus,
          })}
        >
          <label htmlFor="nickname" className="{style.label}">
            이름
          </label>
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
          className={classnames(
            style.wrapper_username,
            { [style.is_error]: !isUsernameValid },
            { [style.is_focus]: isUsernameFocus }
          )}
        >
          <label htmlFor="username" className="{style.label}">
            아이디
          </label>
          <div className={style.input_with_button}>
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
            <button
              type="button"
              className={style.idbtn_check}
              onClick={onCheckUsername}
            >
              중복확인
            </button>
          </div>
        </div>
        <div
          className={classnames(
            style.wrapper_password,
            { [style.is_error]: !isPasswordValid },
            { [style.is_focus]: isPasswordFocus }
          )}
        >
          <label htmlFor="password" className="{style.passwordlabel}">
            비밀번호 설정
          </label>

          <div className={style.password_info}>
            <div className={style.password_container}>
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
        </div>

        <div
          className={classnames(
            style.wrapper_confirm_password,
            { [style.is_error]: !isConfirmPasswordValid },
            { [style.is_focus]: isConfirmPasswordFocus }
          )}
        >
          <label htmlFor="confirmPassword" className="{style.passwordlabel}">
            비밀번호 확인
          </label>
          <div className={style.password_info}>
            <div className={style.password_container}>
              <input
                onChange={onChange}
                onFocus={onFocus}
                name="confirmPassword"
                type={isSecretPassword ? "password" : "text"}
                placeholder="비밀번호 재확인"
                value={confirmPassword}
                maxLength={20}
                className={style.input}
                required
              />
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
        </div>

        <div
          className={classnames(style.wrapper_phone, {
            [style.is_focus]: isPhoneFocus,
          })}
        >
          <label htmlFor="phone" className="{style.label}">
            전화번호
          </label>
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
        <div
          className={classnames(style.wrapper_email, {
            [style.is_focus]: isEmailFocus,
          })}
        >
          <label htmlFor="email" className="{style.label}">
            이메일
          </label>
          <div className={style.input_email}>
            <input
              onChange={(e) => setEmailLeft(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
              id="emailLeft"
              name="emailLeft"
              type="text"
              placeholder="이메일"
              className={style.input_left}
              value={emailLeft}
            />
            <span className={style.at_sign}>@</span>
            <div className={style.input_right_container}>
              <input
                onFocus={() => setIsDropdownOpen(true)}
                onChange={(e) => setEmailRight(e.target.value)}
                id="emailRight"
                name="emailRight"
                type="text"
                placeholder="이메일 도메인"
                className={style.input_right}
                value={emailRight}
              />
              {isDropdownOpen && (
                <ul className={style.domain_dropdown}>
                  {domains.map((domain) => (
                    <li
                      key={domain}
                      className={style.domain_item}
                      onClick={() => handleDomainSelect(domain)}
                    >
                      {domain}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {isEmailSent ? "이메일 인증이 성공적으로 발송되었습니다!" : <button type="button" onClick={handleEmailVerification}>이메일 인증</button>}
          </div>
        </div>
        <div
          className={classnames(style.wrapper_zipcode, {
            [style.is_focus]: isZipcodeFocus,
          })}
        >
          <label htmlFor="zipcode" className="{style.label}">
            우편번호
          </label>
          <div className={style.input_zipostbtn}>
            <input
              onChange={onChange}
              onFocus={onFocus}
              id="zipcode"
              name="zipcode"
              type="text"
              placeholder="우편번호"
              className={style.input}
              value={zipcode}
              readOnly
            />
            <button
              type="button"
              className={style.postbtn_check}
              onClick={togglePopup}
            >
              우편번호 찾기
            </button>
          </div>
        </div>
        <div
          className={classnames(style.wrapper_address1, {
            [style.is_focus]: isAddress1Focus,
          })}
        >
          <label htmlFor="address1" className="{style.label}">
            주소
          </label>
          <input
            onChange={onChange}
            onFocus={onFocus}
            id="address1"
            name="address1"
            type="text"
            placeholder="주소"
            className={style.input}
            value={address1}
            readOnly
          />
        </div>

        {popup && (
          <div className={style.popup}>
            <DaumPostcode onComplete={handleComplete} />{" "}
            <button
              type="button"
              onClick={togglePopup}
              className={style.popup_close}
            >
              닫기
            </button>
          </div>
        )}

        <div
          className={classnames(style.wrapper_address2, {
            [style.is_focus]: isAddress2Focus,
          })}
        >
          <label htmlFor="address2" className="{style.label}">
            상세 주소
          </label>
          <input
            onChange={onChange}
            onFocus={onFocus}
            id="address2"
            name="address2"
            type="text"
            placeholder="상세 주소"
            className={style.input}
            value={address2}
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
      <div
        className={classnames(
          style.btn_submit,
          !isUsernameValid || (!isPasswordValid && style.is_dimmed)
        )}
      >
        <input type="submit" value={isLoading ? "처리 중 ..." : "회원가입"} />
      </div>
    </form>
  );
};

export default Join;
