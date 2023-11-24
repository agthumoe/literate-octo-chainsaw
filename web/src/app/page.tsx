"use client";
import Cart from "@/components/Cart";
import Table from "@/components/Table";
import CartItem from "@/types/CartItem";
import Page from "@/types/Page";
import Product from "@/types/Product";
import calculateDiscount from "@/utils/calculateDiscount";
import getProducts from "@/utils/getProducts";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [data, setData] = useState<Page<Product>>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [calculating, setCalculating] = useState<boolean>(false);
  useEffect(() => {
    getProducts().then(({ data }) => {
      setData(data);
    });
  }, []);

  const subTotal = useMemo(
    () =>
      cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [cart]
  );

  const handleAddToCart = async (product: Product) => {
    // search if product already in cart
    const newCart = [...cart];
    const cartItem = newCart.find((item) => item.product.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      newCart.push({ sku: product.sku, product, quantity: 1 });
    }
    setCart([...newCart]);
    setCalculating(true);
    const { data } = await calculateDiscount([...newCart]);
    setDiscount(data);
    setCalculating(false);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="w-1/2 mr-5">
          <h2 className="text-2xl font-bold py-3">Products</h2>
          <Table
            headers={["ID", "SKU", "Name", "Price"]}
            contents={data?.data || []}
            handleAddToCart={handleAddToCart}
          />
        </div>
        <Cart
          cart={cart}
          subTotal={subTotal}
          discount={discount}
          calculating={calculating}
          clearCart={() => {
            setCart([]);
            setDiscount(0);
            setCalculating(false);
          }}
        />
      </div>
    </>
  );
}
