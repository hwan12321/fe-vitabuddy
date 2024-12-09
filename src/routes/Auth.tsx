import { useEffect } from "react";

const Auth = () => {

  const code = new URL(window.location.href).searchParams.get("code");

  const headers = {
    "Content-type" : "application/x-www-form-urlencoded",
  };

  const fetchKakaoLoginToken = async () => {
    try {
      const kakaoAccessToken = await ( await fetch(`http://localhost:8080?code=${code}`, {
        method: "POST",
        headers: headers,
      })).json();

    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchKakaoLoginToken();
  }, []);

  return (
    <div>로그인 중입니다..</div>
  )
}

export default Auth;