import CartItem from "@/types/CartItem";

interface IProps {
  cart: CartItem[];
  subTotal: number;
  discount: number;
  calculating: boolean;
  clearCart: () => void;
}

const Cart: React.FC<IProps> = ({
  cart,
  subTotal,
  discount,
  calculating,
  clearCart,
}) => {
  return (
    <div className="w-1/2 ml-5">
      <h2 className="text-2xl font-bold py-3">Cart</h2>
      {/* Design cart */}
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="w-1/3">
            <h3 className="font-bold py-3">Product</h3>
          </div>
          <div className="w-1/3">
            <h3 className="font-bold py-3 text-right">Quantity</h3>
          </div>
          <div className="w-1/3">
            <h3 className="font-bold py-3 text-right">Price</h3>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          {cart?.map((item) => (
            <div key={item.sku} className="flex">
              <div key={item.sku} className="w-1/3">
                <p className="py-3">{item.product.name}</p>
              </div>
              <div className="w-1/3 text-right">
                <p className="py-3">{item.quantity}</p>
              </div>
              <div className="w-1/3 text-right">
                <p className="py-3">{item.product.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="">
            <p className="py-3 font-bold text-right">Subtotal: {subTotal}</p>
          </div>
          <div className="">
            <p className="py-3 font-bold text-right text-gray-500">
              Discount: {calculating ? "Calculating..." : discount}
            </p>
          </div>
          <div className="">
            <p className="py-3 font-bold text-right">
              Total: {subTotal - discount}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-10">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={clearCart}
        >
          Clear cart
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => alert("Not yet implemented")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
