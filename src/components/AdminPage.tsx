import { useState } from "react";
import { getAdmin } from "../service/userService";

function AdminPage() {
    const [test, setTest] = useState("");
    const handleAdmin = async () => {
        const result = await getAdmin();
        console.log("AdminPage.tsx : ",result);
        setTest(result);
    }

    return (
        <div>
            <h1>관리자 페이지 : {test}</h1>
            <button onClick={handleAdmin}>어드민권한 사용</button>
        </div>
    );
}

export default AdminPage;
