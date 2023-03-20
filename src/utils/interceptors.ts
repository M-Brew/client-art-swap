import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const instance = axios.create();

instance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && config.headers) {
            const payload = jwtDecode<IPayload>(accessToken);
            if (payload.exp < new Date().getTime() / 1000) {
                const refreshToken = localStorage.getItem("refreshToken");
                const response = await axios.post(
                    "/api/auth/token",
                    { token: refreshToken },
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (response?.status === 200) {
                    localStorage.setItem(
                        "accessToken",
                        response.data.accessToken
                    );
                    config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                } else {
                    const navigate = useNavigate();
                    navigate("/sign-in");
                }
            } else {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default instance;
