

const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = `http://localhost:3000/auth`;

const Login = () => {

    console.log(process.env.REACT_APP_KAKAO_REST_API_KEY);

    const onClickKakaoLogin = () => {
        window.location.href= `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    }

    return (<div>
        <button type="button" onClick={onClickKakaoLogin}>
            카카오 로그인
        </button>
    </div>)
}

export default Login;