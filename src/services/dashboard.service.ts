import axiosInstance from "../utils/interceptors";

export class DashboardService {
    public getData = async () => {
        try {
            const response = await axiosInstance.get(`/api/dashboard`);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
