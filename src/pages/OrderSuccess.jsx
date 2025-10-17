import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-2">
          Thank you for your purchase, Vaishali!
        </p>
        {order && (
          <div className="bg-gray-100 p-4 rounded-xl mt-4 text-left">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          </div>
        )}
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg mt-6 hover:bg-green-600 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
