import axiosInstance from "../utils/interceptors";

export class CheckoutService {
    public checkout = async (details: ICheckoutDetails) => {
        console.log(details);
        try {
            const response = await axiosInstance.post(
                "/api/create-checkout-session",
                { items: details.items },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            return response;
        } catch (error) {
            console.log(error);
        }
    };
}
