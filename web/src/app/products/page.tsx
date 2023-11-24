import Product from "@/types/Product";
import getProducts from "@/utils/getProducts";
import React from "react";

interface IProps {}

const ProductPage: React.FC<IProps> = async ({}) => {
  const { data } = await getProducts();
  const contents = [] as Product[];
  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold py-3">Products</h2>
        <div className="block overflow-x-auto w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-800 table-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">SKU</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-6 py-4">{product.id}</td>
                  <td className="px-6 py-4">{product.sku}</td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4 text-right">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
