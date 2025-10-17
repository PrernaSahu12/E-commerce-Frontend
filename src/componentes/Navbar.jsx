import { ShoppingCart, Home, PackageSearch } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // User not logged in
          setUser(null);
          return;
        }

        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await API.get("/auth/profile");
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold hover:text-gray-200">
        MyShop
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-1 hover:text-gray-200 transition">
          <Home size={20} /> Home
        </Link>

        <Link to="/products" className="flex items-center gap-1 hover:text-gray-200 transition">
          <PackageSearch size={20} /> Products
        </Link>

        <Link
          to="/cart"
          className="relative flex items-center gap-1 hover:text-gray-200 transition"
        >
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>

        {/* Right Side: User info or Login/Signup */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="font-semibold"> {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition text-sm"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
