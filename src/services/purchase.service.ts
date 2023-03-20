import axiosInstance from "../utils/interceptors";

export class PurchaseService {
    public getPurchases = async () => {
        try {
            const response = await axiosInstance.get("/api/purchases");
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public getPurchase = async (id: string) => {
        try {
            const response = await axiosInstance.get(`/api/purchases/${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    public updatePurchase = async (
        purchaseId: string,
        status: "pending" | "delivered"
    ) => {
        try {
            const response = await axiosInstance.put(
                `/api/purchases/${purchaseId}`,
                { status },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return response;
        } catch (error) {
            console.log(error);
        }
    };
}
