import React, { useState } from "react";
import productsData from "../products.json";

const Product = () => {
  const [products, setProducts] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newProduct, setNewProduct] = useState({
    category: "",
    name: "",
    price: "",
    description: "",
    image: "",
    stock: ""
  });

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category) return;
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setNewProduct({ category: "", name: "", price: "", description: "", image: "", stock: "" });
  };

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Our Products</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {["All", "Electronics", "Clothes", "Books"].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-xl transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add New Product Form */}
      <div className="bg-gray-900 border border-gray-700 p-4 rounded-2xl mb-6 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        {["category","name","price","description","image","stock"].map((field) => (
          <input
            key={field}
            type={field === "price" || field === "stock" ? "number" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-2 mb-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={newProduct[field]}
            onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
          />
        ))}
        <button
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-4 hover:shadow-gray-700 hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={product.image || "/fallback-image.jpg"}
              alt={product.name}
              className="w-full h-48 sm:h-56 object-cover rounded-xl border border-gray-700"
            />
            <h2 className="text-lg font-semibold mt-3 truncate">{product.name}</h2>
            <p className="text-gray-400 mt-1">{product.description}</p>
            <p className="text-green-400 font-medium mt-1">₹{product.price}</p>
            <p className="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
