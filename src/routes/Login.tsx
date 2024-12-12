import classNames from "classnames";
import style from "./Login.module.scss";

const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const NAVER_REST_API_KEY = process.env.REACT_APP_NAVER_REST_API_KEY;
const GOOGLE_REST_API_KEY = process.env.REACT_APP_GOOGLE_REST_API_KEY;
const NAVER_REDIRECT_URI = `http://localhost:8080/member/socialLogin/naver`;
const KAKAO_REDIRECT_URI = `http://localhost:8080/member/socialLogin/kakao`;
const GOOGLE_REDIRECT_URI = `http://localhost:8080/member/socialLogin/google`;


const Login = () => {

    const onClickKakaoLogin = () => {
        window.location.href= `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    }

    const onClickNaverLogin = () => {
        window.location.href= `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_REST_API_KEY}&state=flase&redirect_uri=${NAVER_REDIRECT_URI}`;
    }

    const onClickGoogleLogin = () => {
        window.location.href= `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email+profile`;
    }

    return (
        <div id="wrap">
            <div className="introTitle">
                <img src="/images/mainImage.png" id="logoImg" />
            </div>
            <section>
                <h1 className="main-title">
                    WELCOME TO YOUR<br/>HEALTH PARTNER VITABUDDY
                </h1>
                <div className="loginForm">
                    <form>
                        <label htmlFor="id">아이디</label>
                        <br />
                        <input type="text" id="id" name="id" className="formTxt" placeholder="아이디" required />
                        <br />
                        <label htmlFor="pwd">비밀번호</label>
                        <br />
                        <input type="password" id="pwd" name="pwd" className="formTxt" placeholder="비밀번호" required />
                        <br />
                        <div className={style.login_btn_wrap}>
                            <div className={style.social_login_btn_wrap}>
                                <button type="button" className={style.naver_btn} onClick={onClickNaverLogin}/>  
                                <button type="button" className={style.kakao_btn} onClick={onClickKakaoLogin}/>
                                <button type="button" className={style.google_btn} onClick={onClickGoogleLogin}/>
                            </div>
                            <button type="submit" id="loginSubmit" className={classNames("btn","btnFilled",style.module_login_btn)}>로그인</button>
                        </div>
                    </form>
                </div>
            </section>
            <br />
            <section>
                <div>
                    <p>아직 회원이 아니신가요?</p>
                    <a href="/join" className="btn btnFilled">
                        회원가입
                    </a>
                </div>
                <div>
                    <a href="/">
                        둘러보기
                    </a>
                </div>
            </section>
        </div>
    )
}

export default Login;