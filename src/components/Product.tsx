import { useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface Identification {
    name : string;
    price : number;
}
interface Test {
    test : string;
    value : number;
}
type Action = {type : "add"} | {type : "delete"}

function Product(props: Identification) {
    const productId = useParams().productId;
    const location = useLocation();
    const navigate = useNavigate();
    const {name, price} = props;
    const [test, setTest] = useState<Test | null>({
        test : "test",
        value : 100
    });
    const [count, dispatch] = useReducer((state: number, action: Action) => {
        switch(action.type){
            case "add":
                return state + 1;
            case "delete":
                return state - 1;
        }
    } , 0);

    return (
        <div>
            <h1>{productId} 번 Product({name},{price}) 입니다.</h1>
            <h2>{test?.test}, {test?.value}</h2>
            <button onClick={() => dispatch({type : "add"})}>증가</button>
            <button onClick={() => dispatch({type : "delete"})}>감소</button>
            <h2>{count}</h2>
            <button onClick={() => setTest({
                test : "test2",
                value : 200
            })}>테스트 초기화</button>
            
            <ul>
                <li>hash : {location.hash}</li>
                <li>pathname : {location.pathname}</li>
                <li>search : {decodeURI(location.search)}</li>
                <li>state : {location.state}</li>
                <li>key : {location.key}</li>
            </ul>
            <ul>
                <li><button onClick={() => navigate(-2)}>Go 2 pages back</button></li>
                <li><button onClick={() => navigate(-1)}>Go back</button></li>
                <li><button onClick={() => navigate(1)}>Go forward</button></li>
                <li><button onClick={() => navigate(2)}>Go 2 pages forward</button></li>
                <li><button onClick={() => navigate('/')}>Go Root</button></li>
                <li><button onClick={() => navigate('/', {replace: true})}>Go Root</button></li>
            </ul>
        </div>
    )
}

export default Product;
