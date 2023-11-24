import Product from "@/types/Product";
import cx from "classnames";

interface IProps {
  className?: string;
  headers: Array<string>;
  contents: Array<Record<string, any>>;
  handleAddToCart: (product: Product) => void;
}

const Table: React.FC<IProps> = ({
  className,
  headers,
  contents,
  handleAddToCart,
}) => {
  return (
    <div className={cx("relative overflow-x-auto w-full", className)}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-800 table-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-6 py-3">
                {header}
              </th>
            ))}
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((content) => (
            <tr key={content.id} className="border-b">
              {Object.keys(content).map((key) => (
                <td key={key} className="px-6 py-4">
                  {content[key]}
                </td>
              ))}
              <td className="px-6 py-4">
                <button
                  onClick={() => handleAddToCart(content as Product)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add to cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
