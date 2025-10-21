import { ShoppingCart, Home, PackageSearch, Menu, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
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
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-200">
          MyShop
        </Link>

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="flex items-center gap-1 hover:text-gray-200">
            <Home size={20} /> Home
          </Link>

          <Link to="/products" className="flex items-center gap-1 hover:text-gray-200">
            <PackageSearch size={20} /> Products
          </Link>

          <Link to="/cart" className="relative flex items-center gap-1 hover:text-gray-200">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 text-sm">
                Login
              </Link>
              <Link to="/register" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 p-4 space-y-4">
          <Link onClick={() => setMenuOpen(false)} to="/" className="flex items-center gap-2">
            <Home /> Home
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/products" className="flex items-center gap-2">
            <PackageSearch /> Products
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/cart" className="flex items-center gap-2">
            <ShoppingCart /> Cart ({cart.length})
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 w-full px-3 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="block bg-green-500 px-3 py-2 rounded hover:bg-green-600">
                Login
              </Link>
              <Link to="/register" className="block bg-blue-500 px-3 py-2 rounded hover:bg-blue-600">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
