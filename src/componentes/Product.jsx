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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>

     
      <div className="flex gap-4 mb-4">
        {["All", "Electronics", "Clothes", "Books"].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      
      <div className="border p-4 rounded mb-6">
        <h2 className="text-xl font-bold mb-2">Add New Product</h2>
        <input
          type="text"
          placeholder="Category"
          className="border p-2 mb-2 w-full"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          className="border p-2 mb-2 w-full"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 mb-2 w-full"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 mb-2 w-full"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 mb-2 w-full"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          className="border p-2 mb-2 w-full"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-bold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-600 font-semibold mt-1">₹{product.price}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
