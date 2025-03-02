import { useState } from "react";
import { getMe, loginUser } from "./service/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSlice } from "./stores/reducer/userReducer";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(username, password);
        const data = {
            username: username,
            password: password
        }
        const result = await loginUser(data);
        console.log("Login.tsx : ",result);
        const accessToken = result.headers.access;
        localStorage.setItem("accessToken", accessToken);
        
        const userMe = await getMe();
        console.log("Login.tsx userMe : ",userMe);
        
        dispatch(userSlice.actions.LOGIN());
        dispatch(userSlice.actions.SET_USER_INFO(userMe));

        navigate("/");
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;