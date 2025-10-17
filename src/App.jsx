import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./componentes/Navbar";
<<<<<<< HEAD
import Header from "./componentes/Header";
=======
>>>>>>> af32f1edbaa18b757455dbcfb17507bdd5731ee4
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
<<<<<<< HEAD
import Register from "./pages/Register";
import Cart from "./pages/Cart"; // ✅ import Cart page
=======
import Cart from "./pages/Cart";
import Header from "./componentes/Header";
import { CartProvider } from "./context/CartContext";
>>>>>>> af32f1edbaa18b757455dbcfb17507bdd5731ee4
import Checkout from "./pages/checkout";
import OrderSuccess from "./pages/OrderSuccess";
import LoginPage from "./dashbord/Logindash";
import CreateProductForm from "./dashbord/Dashboard";
<<<<<<< HEAD
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
=======
import Register from "./pages/Register";

export default function App() {
  return (
    <>
>>>>>>> af32f1edbaa18b757455dbcfb17507bdd5731ee4
    <CartProvider>
      <Navbar />
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
<<<<<<< HEAD
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login-dash" element={<LoginPage />} />
=======
                 <Route path="/register" element={<Register/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element = {<Checkout/>}/>
            <Route path="/order-success" element={<OrderSuccess/>}/>
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
                 <Route path="/login-dash" element={<LoginPage />} />
>>>>>>> af32f1edbaa18b757455dbcfb17507bdd5731ee4
            <Route path="/dashboard" element={<CreateProductForm />} />
          </Routes>
        </main>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </CartProvider>
<<<<<<< HEAD
=======
           


    </>
>>>>>>> af32f1edbaa18b757455dbcfb17507bdd5731ee4
  );
}
