import {configureStore, createAction, createSlice} from "@reduxjs/toolkit";

interface ToolkitStateType {
    id: number;
    text: string;
}

// payload 타입을 명시한 액션 생성자
const SAVE = createAction<ToolkitStateType>("SAVE");
const DEL = createAction<ToolkitStateType>("DEL");


//createReducer 함수를 사용하여 리듀서 생성
// const saveReducer = createReducer<ToolkitStateType[]>([], (builder) => {
//     builder.addCase(SAVE, (state, action) => {
//         state.push(action.payload);
//     });
//     builder.addCase(DEL, (state, action) => {
//         return state.filter((item) => item.id !== action.payload.id);
//     });
// });

//createSlice 함수를 사용하여 리듀서 생성
const saveSlice = createSlice({
    name: "saveReducer",
    initialState: [] as ToolkitStateType[],
    reducers: {
        SAVE: (state, action) => {
            state.push(action.payload);
        },
        DEL: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        }
    }
});

export {saveSlice}

const saveReducerStore = configureStore({
    reducer: saveSlice.reducer
});

export {SAVE, DEL, saveReducerStore};  // 액션 생성자 export
// export default saveReducer;
