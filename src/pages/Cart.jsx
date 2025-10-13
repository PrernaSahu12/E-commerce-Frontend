import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import { createOrderCOD, createOnlineOrder } from "../services/productServices";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, addToCart, removeFromCart, totalPrice, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  
  const handleCheckout = async () => {
    try {
      if (!token) {
        alert("Please log in before placing an order.");
        navigate("/login");
        return;
      }

      await createOrderCOD();
      toast.success(`Order placed successfully! Total ₹${totalPrice}`);
      clearCart();
      localStorage.removeItem("cart");
      navigate("/products");
    } catch (error) {
      console.error("COD order failed:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };


  const handleOnlineCheckout = async () => {
    try {
      if (!token || !user) {
        alert("Please log in first.");
        return;
      }

      const orderData = {
        userId: user._id,
        cartItems: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        totalAmount: totalPrice,
        shippingAddress: "Default address",
        paymentMethod: "Online",
      };

      const { data } = await API.post("/orders/create-online", orderData);

      if (!data || !data.razorpayOrder) {
        toast.error("Failed to initialize payment");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        order_id: data.razorpayOrder.id,
        handler: function (response) {
          toast.success("Payment successful!");
          clearCart();
          localStorage.removeItem("cart");
          navigate("/products");
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500 italic mt-12">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-6 mb-5 w-full max-w-md flex flex-col items-start"
            >
              <h4 className="text-lg font-semibold mb-1">{item.name}</h4>
              <p className="text-blue-600 font-semibold mb-1">
                Price: ₹{item.price}
              </p>
              <p className="mb-3">Quantity: {item.quantity}</p>
              <div className="flex space-x-4 mt-2">
                <button
                  className="bg-black hover:bg-gray-800 text-white py-2 px-5 rounded-md text-sm font-medium transition"
                  onClick={() => addToCart(item)}
                >
                  Add
                </button>
                <button
                  className="bg-black hover:bg-gray-800 text-white py-2 px-5 rounded-md text-sm font-medium transition"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3 className="text-xl font-semibold mt-3 mb-6">
            Total: ₹{totalPrice}
          </h3>
          <div className="flex gap-6 mb-5">
            <button
              className="bg-black hover:bg-gray-800 text-white border border-green-500 py-2 px-6 rounded-md font-medium transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout (COD)
            </button>

            <button
              className="bg-black hover:bg-gray-800 text-white border border-green-500 py-2 px-6 rounded-md font-medium transition"
              onClick={handleOnlineCheckout}
            >
              Pay Online
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
