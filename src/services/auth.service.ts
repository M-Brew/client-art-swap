import axios from "axios";

export class AuthService {
    public adminSignIn = async (details: ISignIn) => {
        try {
            const response = await axios.post(
                "/api/auth/admin-sign-in",
                { email: details.email, password: details.password },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            console.log(response);

            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public signIn = async (details: ISignIn) => {
        try {
            const response = await axios.post("/api/auth/sign-in", details, {
                headers: { "Content-Type": "application/json" },
            });

            console.log(response);

            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public signUp = async (details: ISignUp) => {
        try {
            const response = await axios.post("/api/auth/sign-up", details, {
                headers: { "Content-Type": "application/json" },
            });

            console.log(response);

            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public checkAuth = async () => {
        try {
            const response = await axios.get("/api/auth/check-auth");

            console.log(response);

            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public signOut = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await axios.post("/api/auth/sign-out", {
                token: refreshToken,
            });
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }
        }
    };
}
