import { legacy_createStore as createStore} from 'redux'

const COUNT_PLUS = 'count/PLUS';
const COUNT_MINUS = 'count/MINUS';

type ActionType = {
    type: string;
}

const plusCount = () => {
    return {
        type: COUNT_PLUS
    }
}

const minusCount = () => {
    return {
        type: COUNT_MINUS
    }
}

const countReducer = (state = 0, action:ActionType) => {
    switch (action.type) {
        case COUNT_PLUS:
            return state + 1;
        case COUNT_MINUS:
            return state - 1;
        default:
            return state;
    }
}

const countStore = createStore(countReducer);

export {countStore, plusCount, minusCount ,countReducer};
