import { getUsers, UserData } from "../service/userService";
import { useEffect, useState } from "react";



export default function AxioxTest() {
    const [users, setUsers] = useState<UserData[]>([]);

    const getClick = async () => {
        const data = await getUsers();
        console.log("AxioxTest : ",data);
        setUsers(data);
    }

    useEffect(() => {
        getClick();
    }, []);
    return (
        <div>
            <h1>유저 페이지</h1>
            <button onClick={getClick}> 데이터 가져오기 </button> 
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.username}, {user.role}, {user.jikim}</li>
                ))}
            </ul>
        </div>
    );
}
