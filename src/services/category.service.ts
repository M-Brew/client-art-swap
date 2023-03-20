import axios from "axios";
import axiosInstance from "../utils/interceptors";

export class CategoryService {
    public createCategory = async (details: ICategoryDetails) => {
        try {
            const formData = new FormData();
            formData.append("name", details.name);
            formData.append("description", details.description);
            if (details.image) {
                formData.append("image", details.image);
            }

            const response = await axiosInstance.post(
                "/api/categories",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public getCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public getCategory = async (id: string) => {
        try {
            const response = await axios.get(`/api/categories/${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public updateCategory = async (
        categoryId: string,
        details: ICategoryDetails
    ) => {
        try {
            const formData = new FormData();
            formData.append("name", details.name);
            formData.append("description", details.description);
            if (details.image) {
                formData.append("image", details.image);
            }

            const response = await axiosInstance.put(
                `/api/categories/${categoryId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public deleteCategory = async (id: string) => {
        try {
            const response = await axiosInstance.delete(`/api/categories/${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    };
}

interface ICategoryDetails {
    name: string;
    description: string;
    image: File | null;
}
