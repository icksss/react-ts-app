import { Link } from "react-router-dom";

function Header() {
    return (
        <div>
             <Link to="/">
                <h1>헤더입니다. 날 누르면 root으로 이동합니다.</h1>
            </Link>
        </div>
    )
}  

export default Header;
