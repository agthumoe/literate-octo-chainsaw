import Page from "@/types/Page";
import Product from "@/types/Product";
import { cache } from "react";
import api from "./api";

const getProducts = cache(async () => {
  return api.get<Page<Product>>("/products");
});

export default getProducts;
