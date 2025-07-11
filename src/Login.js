import React, {useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "./store";
import apiClient from "./api/axiosInstance";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const csrfToken = useSelector(state=>state.token.token);
    const dispatch = useDispatch();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            const response = await apiClient.post("/login",
                new URLSearchParams({ username, password }));
            const role=response.data.role;
            console.log(role);
            const token=response.headers["authorization"];
            //HTTP 헤더가 실제로는 "대소문자를 구분하지 않는(case-insensitive)" 스펙에 따르기
            await dispatch(setToken(token));
            onLogin();
        } catch (error) {
            console.log(error);
            console.log(error.response.status);
            setMessage(error.response.data.result);
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post("/join",
                { username, password });
            setMessage(response.data); // 성공 메시지

        } catch (error) {
            if(error.response && error.response.status === 409){
                setMessage(error.response.data);
            }
            // setMessage("Join failed");
        }
    };

    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    // ref={usernameRef}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    // ref={passwordRef}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" name="login" onClick={handleLogin}>Login</button>
                <button type="button" name="join" onClick={handleJoin}>Join</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
