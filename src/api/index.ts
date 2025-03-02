import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

const REFRESH_URL = "/reissue";

/** Axios Response 데이터 형식
 *  config : 요청에 대한 axios 구성 설정
 *  data 서버가 제공한 응답 데이터
 *  headers : 헤더 정보
 *  request : 요청
 *  status : 응답 HTTP 상태 코드
 *  statusText : 응답 HTTP 상태 메시지
 */
 
interface ErrorType {
  code: number;
  message: string;
}

 // 본인 서버에서 내려주는 응답 구조
export interface APIResponse<T> {
  success: boolean
  error : ErrorType | null
  data  : T 
}


const client = axios.create({
    baseURL: "http://localhost:5173",
    headers: {
        "Content-Type": "application/json",
    },
});

client.interceptors.request.use(
  (config) => {
    // getToken() - 클라이언트에 저장되어 있는 액세스 토큰을 가져오는 함수
    let token = getToken();

  if (config.url === REFRESH_URL) {
      token = localStorage.getItem('refreshToken'); //저장하는 경우(쿠키에 있으면 쿠키 추가만)
    } else {
      token = localStorage.getItem('accessToken');
    }

    if(token){
      // config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['access'] = `${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

const getToken = () => {
  return localStorage.getItem("accessToken");
}

client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { config, response: { status } } = err;

    /** 1 refreshToken으로 토큰 재발급 */
    if (config.url === REFRESH_URL || status !== 401 || config.sent) {
        return Promise.reject(err);
    }
    console.log("axios.interceptors.response.use :",config, ", status :", status);
    /** 2 새로 받은 토큰으로 기존 요청 재실행.*/
    config.sent = true;
    const accessToken = await getRefreshToken();

    if (accessToken) {
      config.headers.access = `${accessToken}`;
    }

    return axios(config);
  }
);

const getRefreshToken = async (): Promise<string | void> => {
  try {
    const res = await axios.post(REFRESH_URL);
    console.log("index.ts getRefreshToken res :", res);
    const accessToken = res.headers.access;
        
    localStorage.setItem('accessToken', accessToken);

    return accessToken;
  } catch (e) {
    localStorage.removeItem('accessToken');
  }
}


//TODO: GET 메서드
export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  try {
    const response = await client.get<AxiosResponse<T>>(url, config);
    return response.data;
  } catch (error:any) {
    throw new Error(error.message);
  }
};

//TODO: POST 메서드
export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  try {
    const response = await client.post(url, data, config);
    console.log("index.ts postData response :", response);
    return response;
  } catch (error:any) {
    throw new Error(error.message);
  }
};

//TODO: PUT 메서드
export const putData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  try {
    const response = await client.put(url, data, config);
    return response;
  } catch (error:any) {
    throw new Error(error.message);
  }
};

//TODO: Delete 메서드
export const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  try {
    const response = await client.delete(url, config);
    return response;
  } catch (error:any) {
    throw new Error(error.message);
  }
};