import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg text-center border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-4">
          🎉 Order Placed Successfully!
        </h1>

        <p className="text-gray-300 mb-2">
          Thank you for your purchase, <span className="font-semibold">Vaishali!</span>
        </p>

        {order && (
          <div className="bg-gray-800 p-4 rounded-xl mt-4 text-left border border-gray-700">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="bg-black hover:bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-lg mt-6 transition font-medium"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
