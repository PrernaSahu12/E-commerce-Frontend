import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./componentes/Navbar";
import Header from "./componentes/Header";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart"; 
import Checkout from "./pages/checkout";
import OrderSuccess from "./pages/OrderSuccess";
import LoginPage from "./dashbord/Logindash";
import CreateProductForm from "./dashbord/Dashboard";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login-dash" element={<LoginPage />} />
            <Route path="/dashboard" element={<CreateProductForm />} />
          </Routes>
        </main>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </CartProvider>
  );
}
