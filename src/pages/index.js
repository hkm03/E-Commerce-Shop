import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import data from "../../public/data";

const Home = () => {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 sm:p-6 lg:p-8">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Home;
