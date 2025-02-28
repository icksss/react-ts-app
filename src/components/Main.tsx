import { Link } from "react-router-dom";
import MyButton from "./MyButton";
function Main() {
    const onclick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("주문하기 버튼이 클릭되었습니다.", e.target);
    }
    return (
        <div>
            <h1>Main 입니다.</h1>
            <ul>
				<Link to="/product/1?name=사과&price=1000"><li>1번상품</li></Link>
				<Link to="/product/2?name=바나나&price=2000"><li>2번상품</li></Link>
			</ul>
            <MyButton name="주문하기" onClick={onclick} />
        </div>
    )
}   

export default Main;
