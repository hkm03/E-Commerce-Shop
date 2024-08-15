import { useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "@/utils/format";

const CartPage = () => {
  const {
    cart,
    updateQuantity,
    removeItem,
    applyDiscount,
    calculateSubtotal,
    calculateTotal,
  } = useCart();
  const [discountType, setDiscountType] = useState("fixed");
  const [discountValue, setDiscountValue] = useState("");
  const router = useRouter();

  const handleApplyDiscount = () => {
    const value = parseFloat(discountValue);
    if (!isNaN(value) && value >= 0) {
      applyDiscount(discountType, value);
    }
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-sans mx-auto max-w-4xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center">
        Shopping Cart
      </h1>
      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center mb-4 border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover mb-4 sm:mb-0 mr-0 sm:mr-4"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {item.brand} | {item.title}
                </h3>
                <p className="text-gray-800 font-bold mb-2">
                  {formatCurrency(item.price)}
                </p>
                <div className="flex justify-center sm:justify-start items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded-r"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item)}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold mt-4 py-2 px-4 rounded"
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Subtotal: {formatCurrency(calculateSubtotal())}
            </h2>
            <div className="my-4">
              <label className="block text-lg font-semibold mb-2">
                Apply Discount:
              </label>
              <div className="flex flex-col sm:flex-row items-center">
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  className="p-2 border border-gray-300 rounded mb-2 sm:mb-0"
                >
                  <option value="fixed">Fixed Amount</option>
                  <option value="percentage">Percentage</option>
                </select>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder="Enter discount value"
                  className="p-2 border border-gray-300 rounded ml-0 sm:ml-2 mb-2 sm:mb-0"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="bg-blue-500 text-white p-2 ml-0 sm:ml-2 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Total Price: {formatCurrency(calculateTotal())}
            </h2>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white p-2 mt-4 w-full sm:w-auto rounded transition-all duration-300 hover:scale-105"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
