import { useState } from "react";
import { formatCurrency } from "@/utils/format";

const ProductCard = ({ product, addToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  return (
    <div className="border rounded-lg bg-gray-200 font-sans flex justify-between flex-col ">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64  object-cover rounded-md mb-2"
      />
      <div className="">
        <p className="text-lg font-bold ml-4 mb-2 text-gray-500">
          {product.brand}
        </p>
        <p className="text-base font-semibold ml-4 mb-2">{product.title}</p>
        <h2 className="text-lg font-bold text-gray-1000 ml-4 mb-4">
          {formatCurrency(product.price)}
        </h2>
      </div>
      <div className="w-50 pt-50">
        <button
          onClick={handleAddToCart}
          className={`h-auto relative z-0 rounded-lg transition-all duration-100 hover:scale-110 bg-blue-500 hover:bg-blue-700 text-white font-bold font-sans mb-4 ml-4 py-2 px-4 rounded-full mt-5 transition duration-500 transform ${
            isAdded
              ? "bg-green-500 text-white scale-105"
              : "bg-blue-500 text-white"
          } ${isAdded ? "cursor-default" : "cursor-pointer"}`}
          disabled={isAdded}
        >
          {isAdded ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
