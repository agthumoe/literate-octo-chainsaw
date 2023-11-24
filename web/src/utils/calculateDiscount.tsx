import CartItem from "@/types/CartItem";
import api from "./api";

const calculateDiscount = async (carts: CartItem[]) => {
  const skus = carts.reduce((acc, item) => {
    for (let i = 0; i < item.quantity; i++) {
      acc.push(item.sku);
    }
    return acc;
  }, [] as string[]);
  return api.post<number>("/rules", skus);
};

export default calculateDiscount;
