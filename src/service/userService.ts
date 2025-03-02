import { APIResponse, getData, postData } from "../api";

//User Data 매핑
export interface UserData {
    id: number;
    username: string;
    role: string;
    jikim: string;
}
export interface UserJoinData {
    username: string;
    password: string;
    role: string;
}

export interface UserLoginData {
    username: string;
    password: string;
}

export interface UserMeData {
    username: string;
    role: string;
}

//User 데이터 조회
export const getUsers = async (): Promise<UserData[]> => {
    try {
        const response = await getData<UserData[]>("/api/users");
        const { data } = response;
        console.log("userService.ts :",data);
        return data;
    } catch (error) {
        throw new Error("사용자 데이터를 불러오는데 실패했습니다.");
    }
};

//User 데이터 추가
export const addUser = async (user: UserJoinData): Promise<APIResponse<string>> => {
    try {
        const response = await postData<APIResponse<string>>("/api/join", user);
        console.log("userService.ts :", response);
        return response.data;  // APIResponse 타입의 데이터만 반환
    } catch (error) {
        throw new Error("사용자 데이터를 추가하는데 실패했습니다.");
    }
}

//User 데이터 로그인
export const loginUser = async (user: UserLoginData): Promise<any> => {
    try {
        const response = await postData("/login", user);
        console.log("userService.ts  loginUser response :", response);
        return response;
    } catch (error) {
        throw new Error("사용자 데이터를 로그인하는데 실패했습니다.");
    }
}

//Admin 권한 테스트
export const getAdmin = async (): Promise<string> => {
    try {
        const response = await getData<string>("/api/admin");
        const { data } = response;
        console.log("getAdmin :",data);
        return data;
    } catch (error) {
        throw new Error("Admin 권한 테스트 데이터를 불러오는데 실패했습니다.");
    }
};

//User Me데이터 조회(로그인 후 유저 정보 조회)
export const getMe = async (): Promise<UserMeData> => {
    try {
        const response = await getData<UserMeData>("/api/user/me");
        const { data } = response;
        console.log("userService.ts getMe :",data);
        return data;
    } catch (error) {
        throw new Error("사용자 데이터를 불러오는데 실패했습니다.");
    }
};

