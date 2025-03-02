import { useState } from "react";
import { addUser } from "../service/userService";

function Join() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("ROLE_USER");

    const handleJoin = async (e: React.FormEvent<HTMLFormElement>) =>  {
        e.preventDefault();
        
        const data = {
            username: username,
            password: password,
            role: role
        }
        
        const result = await addUser(data);
        // const result = await postData("/api/join", data);

        console.log(result);
        if (result.success) {
            alert("회원가입이 완료되었습니다.");
        } else {
            alert("회원가입에 실패했습니다.");
        }
    }


    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={handleJoin}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role EX) ROLE_USER" />
                <button type="submit">Join</button>
            </form>
        </div>
    );
}

export default Join;
