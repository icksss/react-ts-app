import { combineReducers } from "redux";
import { countReducer } from './countReducer';
import { todoReducer } from './todoReducer';
// import saveReducer from "./saveToolkitReducer";
import { saveSlice } from "./saveToolkitReducer";
import { userSlice } from "./userReducer";
const rootReducer = combineReducers({
  count: countReducer,
  todos: todoReducer,
  // save: saveReducer,
  save: saveSlice.reducer,
  user: userSlice.reducer,
  // 다른 리듀서들도 여기에 추가할 수 있습니다
  // counter: counterReducer,
  // user: userReducer,
});

export default rootReducer;

// useSelector로 스토어에 접근할 때 필요하다!
export type RootState = ReturnType<typeof rootReducer>;