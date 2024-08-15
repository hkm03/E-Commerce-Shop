import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (product, quantity) => {
    if (quantity <= 0) {
      removeItem(product);
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeItem = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const calculateSubtotal = () => {
    return cart
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal - discount).toFixed(2);
  };

  const applyDiscount = (type, value) => {
    const subtotal = parseFloat(calculateSubtotal());
    if (type === "fixed") {
      setDiscount(Math.min(value, subtotal));
    } else if (type === "percentage") {
      setDiscount(((subtotal * value) / 100).toFixed(2));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        applyDiscount,
        calculateSubtotal,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
