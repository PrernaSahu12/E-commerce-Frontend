import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrderCOD } from "../services/productServices";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems] = useState([
    { name: "T-Shirt", qty: 2, price: 500 },
    { name: "Shoes", qty: 1, price: 1200 },
  ]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        shippingAddress: {
          fullName: address.fullName,
          address: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          phone: address.phone,
        },
        items: cartItems,
        totalPrice: totalPrice,
        paymentMethod: "COD",
      };

      const res = await createOrderCOD(orderData);
      console.log(" Order placed successfully:", res);

      navigate("/order-success", { state: { order: res } });
    } catch (error) {
      console.error(" Error placing order:", error);
      alert("Failed to place order, please try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Checkout
        </h2>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={address.fullName}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:outline-green-500"
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={address.street}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:outline-green-500"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:outline-green-500"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:outline-green-500"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:outline-green-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={address.phone}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:outline-green-500"
          />
        </div>

        
        <div className="bg-gray-100 p-4 rounded-xl mb-6">
          <h3 className="text-xl font-semibold mb-2">🛒 Order Summary</h3>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b py-2 text-gray-700"
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg transition duration-200"
        >
          Place Order (COD)
        </button>
      </div>
    </div>
  );
};

export default Checkout;
