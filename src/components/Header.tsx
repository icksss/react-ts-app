import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import MyButton from "./MyButton";
import { postData } from "../api";
import { userSlice } from "../stores/reducer/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/reducer";

interface LoginInfo {
    isLoggedIn: boolean;
    username?: string;
    role?: string;
}

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginInfo:LoginInfo = useSelector((state: RootState)   => state.user);
    console.log("Header.tsx loginInfo : ",loginInfo);
    
    const handleLogout = async () => {
        try {
            // 서버에 로그아웃 요청을 보내서 HttpOnly 쿠키 삭제
            await postData("/logout", {});
            
            // 클라이언트 측 저장소 정리
            localStorage.removeItem("accessToken");
            cookie.remove("refresh");
            dispatch(userSlice.actions.LOGOUT());
            navigate("/login");
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    }

    return (
        <div>
            <Link to="/">
                <h1>헤더입니다. 날 누르면 root으로 이동합니다.</h1>
            </Link>
            {loginInfo.isLoggedIn ? (
                <>
                    <MyButton name="logout" onClick={handleLogout}/>
                    <p>{loginInfo?.username} , {loginInfo?.role}</p>
                </>
            ) : (
                <MyButton name="login" onClick={() => navigate("/login")}/>
            )}
        </div>
    )
}

export default Header;
