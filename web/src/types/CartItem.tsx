import Product from "./Product";

export default interface CartItem {
  sku: string;
  quantity: number;
  product: Product;
}
