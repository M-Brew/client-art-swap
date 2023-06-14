import axiosInstance from "../utils/interceptors";

export class CheckoutService {
  public checkout = async (details: ICheckoutDetails) => {
    try {
      const response = await axiosInstance.post(
        "/api/checkout/initialize",
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

  public verify = async (
    ref: string,
    items: {
      id: string;
      quantity: number;
      selectedSizeId?: string;
    }[]
  ) => {
    try {
      const response = await axiosInstance.post(
        `/api/checkout/verify`,
        { reference: ref, items },
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
