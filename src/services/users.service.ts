import axiosInstance from "../utils/interceptors";

export class UsersService {
    public getUsers = async () => {
        try {
            const response = await axiosInstance.get(`/api/users`);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    public getUser = async (userId: string) => {
        try {
            const response = await axiosInstance.get(`/api/users/${userId}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
