import axios from "axios";
import axiosInstance from "../utils/interceptors";

export class ArtPieceService {
    public createArtPiece = async (details: IArtPieceDetails) => {
        try {
            const formData = new FormData();
            formData.append("title", details.title);
            formData.append("categoryId", details.category);
            formData.append("brief", details.brief);
            formData.append("width", details.width.toString());
            formData.append("height", details.height.toString());
            formData.append("price", details.price.toString());
            formData.append("year", details.year.toString());
            if (details.image) {
                formData.append("image", details.image);
            }

            const response = await axiosInstance.post(
                "/api/art-pieces",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public getArtPieces = async () => {
        try {
            const response = await axios.get("/api/art-pieces");
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public getArtPiece = async (id: string) => {
        try {
            const response = await axios.get(`/api/art-pieces/${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public getCategoryArtPieces = async (categoryId: string) => {
        try {
            const response = await axios.get(
                `/api/art-pieces/category/${categoryId}`
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public updateArtPiece = async (
        artPieceId: string,
        details: IArtPieceDetails
    ) => {
        try {
            const formData = new FormData();
            formData.append("title", details.title);
            formData.append("categoryId", details.category);
            formData.append("brief", details.brief);
            formData.append("width", details.width.toString());
            formData.append("height", details.height.toString());
            formData.append("price", details.price.toString());
            formData.append("year", details.year.toString());
            if (details.image) {
                formData.append("image", details.image);
            }
            if (details.otherSizes) {
                formData.append(
                    "otherSizes",
                    JSON.stringify(details.otherSizes)
                );
            }
            console.log({ formData });

            const response = await axiosInstance.put(
                `/api/art-pieces/${artPieceId}`,
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

    public deleteArtPiece = async (id: string) => {
        try {
            const response = await axiosInstance.delete(
                `/api/art-pieces/${id}`
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    };
}
