import axios from "axios";

import store, {setToken} from "../store";

const apiClient=axios.create({
    baseURL:"/api",
    headers:{
        "Content-Type" : "application/json",
    },
    withCredentials: true,
// timeout:3000,
});



apiClient.interceptors.request.use((config) => {
    // 1. 요청 데이터가 URLSearchParams 타입인지 확인
    if (config.data instanceof URLSearchParams) {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    const jwtToken=store.getState().token.token;
    config.headers["authorization"]=jwtToken;

    return config; // 수정된 config 반환
}, (error) => {
    // 요청을 가로채는 중에 에러 발생 시 처리
    return Promise.reject(error);
});


apiClient.interceptors.response.use((response)=> response,
    async  (error)=>{
    const originalReguest = error.config;
    if(error.response && error.response.status === 456 && ! originalReguest._retry){
        originalReguest._retry = true;
            try{
                const response = await axios.post("/api/reissue", null , {
                    withCredentials:true,
                });

                const newAccess = response.headers['authorization'];
                store.dispatch(setToken(newAccess));
                console.log("만료된 요청 재시도");
                return apiClient(originalReguest);
            }catch(error){
                console.error('리프레시 토큰으로 재발급 실패:', error);
                // 재발급 실패 시 에러 전달 (로그아웃 처리 등 추가 가능)
                return Promise.reject(error);
            }
    }
    return Promise.reject(error); // 다른 에러는 그대로 반환
});

export default apiClient;