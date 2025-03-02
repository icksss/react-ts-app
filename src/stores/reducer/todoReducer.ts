import { legacy_createStore as createStore} from 'redux'
const TODO_ADD = 'todo/ADD';
const TODO_DELETE = 'todo/DELETE';

type TodoState = {
    text: string;
    id: number;
}

interface TodoAction {
    type: string;
    payload: TodoState;
}

const addTodoFn = (text: string) => {
    return {
        type: TODO_ADD,
        payload: {text, id: Date.now()}
    }
}

const deleteTodoFn = (id: number) => {
    return {
        type: TODO_DELETE,
        payload: {id}
    }
}

const todoReducer = (state: TodoState[] = [], action: TodoAction) => {
    switch (action.type) {
        case TODO_ADD:
            return [{text: action.payload.text, id: Date.now()}, ...state];
        case TODO_DELETE:
            return state.filter(todo => todo.id !== action.payload.id);
        default:
            return state;
    }
}

const todoStore = createStore(todoReducer);
export {todoStore, addTodoFn, deleteTodoFn, todoReducer};
