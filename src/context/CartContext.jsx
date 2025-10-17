import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
     
    }
  }, [cart]);

  const addToCart = (product) => {
    if (!product || !product._id) {
      console.warn("addToCart called with invalid product:", product);
      return;
    }

    setCart((prev) => {
      const found = prev.find((p) => p && p._id === product._id);
      if (found)
        return prev.map((p) => (p && p._id === product._id ? { ...p, quantity: (p.quantity || 1) + 1 } : p));

      toast.success(`${product.name} added to cart`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) =>
    setCart((prev) => prev.filter((p) => p && p._id !== productId));

  const updateQty = (id, quantity) =>
    setCart((prev) => prev.map((p) => (p && p._id === id ? { ...p, quantity } : p)));

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalPrice, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
