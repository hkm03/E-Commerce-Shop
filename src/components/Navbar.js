import Link from "next/link";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-gray-800 p-8 font-sans ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">E-Commerce Shop</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/products" className="text-white font-sans">
            Products
          </Link>
          <Link href="/cart" className="relative text-white font-sans">
            Cart
            <span className="ml-1 bg-red-500 text-white text-sm rounded-full px-2 py-0.5  ">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
