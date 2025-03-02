import { Link } from "react-router-dom";
import MyButton from "./MyButton";
import { plusCount, minusCount } from "../stores/reducer/countReducer";
import { addTodoFn, deleteTodoFn } from "../stores/reducer/todoReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/reducer";
import { useEffect } from "react";
import store from "../stores/store";
import { connect } from "react-redux";
import { saveSlice } from "../stores/reducer/saveToolkitReducer";
import "../assets/Main.css";
// import { SAVE, DEL } from "../stores/reducer/saveToolkitReducer";
function Main(props:any) {
    //mapStateToProps, mapDispatchToProps 함수의 return 값이 props로 전달됨
    console.log("props : ", props);
    
    const count = useSelector((state: RootState) => state.count);
    const todos = useSelector((state: RootState) => state.todos);
    const saves = useSelector((state: RootState) => state.save);
    console.log("saves : ", saves);
    const dispatch = useDispatch();

    // 통합 store 구독
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            console.log('상태 변경:', {
                count: state.count,
                todos: state.todos,
                save: state.save
            });
        });

        return () => unsubscribe();
    }, []);

    // count 상태 변화 구독
    useEffect(() => {
        console.log('Count 상태 변경:', count);
    }, [count]); // count가 변경될 때만 실행

    // todos 상태 변화 구독
    useEffect(() => {
        console.log('Todos 상태 변경:', todos);
    }, [todos]); // todos가 변경될 때만 실행


    // save 상태 변화 구독
    useEffect(() => {
        console.log('Save 상태 변경:', saves);
    }, [saves]); // save가 변경될 때만 실행

    const countPlus = () => {
        // dispatch(plusCount());
        props.dispatch_plusCount();
    }

    const countMinus = () => {
        dispatch(minusCount());
    }

    const addTodo = () => {
        dispatch(addTodoFn("새로운 할 일"));
    }

    const deleteTodo = (id: number) => {
        dispatch(deleteTodoFn(id));
    }

    const handleSave = () => {
        // dispatch(SAVE({id: Date.now(), text: "save"}));
        dispatch(saveSlice.actions.SAVE({id: Date.now(), text: "saveSlice"}));
    }

    const handleDel = (id: number) => {
        // dispatch(DEL({id: id, text: "del"}));
        dispatch(saveSlice.actions.DEL({id: id, text: "del"}));
    }

    return (
        <div>
            <h1>Main 입니다.</h1>
            <ul className="main-ul">
                <Link to="/axiosjoin"><li>회원가입</li></Link>
                <Link to="/login"><li>로그인</li></Link>
                <Link to="/admin"><li>관리자 페이지</li></Link>
                <Link to="/axiostest"><li>유저페이지</li></Link>
                <Link to="/about"><li>About</li></Link>
                <Link to="/product/1?name=사과&price=1000"><li>1번상품</li></Link>
                <Link to="/product/2?name=바나나&price=2000"><li>2번상품</li></Link>
            </ul>
            <MyButton name="count Plus" onClick={countPlus} /><br/>
            <MyButton name="count Minus" onClick={countMinus} /><br/>
            <MyButton name="add Todo" onClick={addTodo} /><br/>
            <MyButton name="save" onClick={handleSave} /><br/>

            <p>count: {count}</p>
            <div className="todo-list">
                {todos.map((item) => (
                    <div key={item.id}>
                        <span>{item.text}</span>
                        <button onClick={() => deleteTodo(item.id)}>del</button>
                    </div>
                ))}
            </div>
            <div >
                {saves.map((item) => (
                    <div key={item.id}>
                        <span>{item.text}</span>
                        <button onClick={() => handleDel(item.id)}>del</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

function mapStateToProps(state: RootState) {
    // console.log(state, ownProps);
    return {
        count: state.count,
        todos: state.todos
    }
}

function mapDispatchToProps(dispatch: any) {
    return {  //plusCount, minusCount, addTodoFn 함수를 생성해서 반환-> 어디로? props로 전달
        dispatch_plusCount: () => dispatch(plusCount()),
        dispatch_minusCount: () => dispatch(minusCount()),
        dispatch_addTodoFn: (text: string) => dispatch(addTodoFn(text)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);  //Main 생성자로 props를 mapStateToProps return 값으로 전달
