import { createAction, createSlice } from "@reduxjs/toolkit";

const LOGIN = createAction("user/LOGIN");
const LOGOUT = createAction("user/LOGOUT");
const SET_USER_INFO = createAction("user/SET_USER_INFO");

type UserState = {
    isLoggedIn: boolean;
    username?: string;
    role?: string;
}


const userSlice = createSlice({
    name: "userReducer",
    initialState: {isLoggedIn: false},
    reducers: {
        LOGIN: (state: UserState) => {
            state.isLoggedIn = true;
        },
        LOGOUT: (state: UserState) => {
            state.isLoggedIn = false;
        },
        SET_USER_INFO: (state: UserState, action) => {
            state.username = action.payload.username;
            state.role = action.payload.role;
        }
    }
})

export {userSlice, LOGIN, LOGOUT, SET_USER_INFO}