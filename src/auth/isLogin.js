import { cookies } from "../shared/cookie";

// 로그인 여부 확인
const isLogin = () => !!cookies.get("refreshToken");
export default isLogin;
