const CheckoutPage = () => {
    return (
      <div className="p-4 sm:p-6 flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-blue-500 font-sans">
          Checkout
        </h1>
        <p className="text-green-500 font-sans text-xl sm:text-2xl lg:text-3xl mb-2">
          Thank you for your purchase! Your order has been placed successfully.
        </p>
        <p className="text-green-500 font-sans text-lg sm:text-xl lg:text-2xl">
          We will process your order and send you a confirmation email shortly.
        </p>
      </div>
    );
  };
  
  export default CheckoutPage;
  