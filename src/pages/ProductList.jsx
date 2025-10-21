import React, { useContext, useEffect, useState } from "react";
import { getAllProduct } from "../services/productServices";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProductList({ products: propsProducts }) {
  const [products, setProducts] = useState(propsProducts || []);
  const [loading, setLoading] = useState(!propsProducts || propsProducts.length === 0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (propsProducts && propsProducts.length > 0) {
      setProducts(propsProducts);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        setProducts(data || []);
        console.log(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [propsProducts]);

  if (loading)
    return <p className="text-center mt-10 text-white">Loading...</p>;
  if (!products || products.length === 0)
    return <p className="text-center mt-10 text-white">No Products</p>;

  let displayedProducts = products;

  if (category !== "all") {
    displayedProducts = displayedProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  displayedProducts = displayedProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "price-asc") displayedProducts.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") displayedProducts.sort((a, b) => b.price - a.price);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">🛍️ All Products</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-4 hover:shadow-gray-700 hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={
                product.images.length > 0
                  ? `https://e-commerce-backend-2-cuuu.onrender.com${product.images[0].url}`
                  : "/fallback-image.jpg"
              }
              alt={product.name}
              className="w-full h-48 sm:h-56 md:h-48 object-cover rounded-xl border border-gray-700"
            />
            <h2 className="text-lg font-semibold mt-3 text-white truncate">{product.name}</h2>
            <p className="text-green-400 font-medium">₹{product.price}</p>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.name} added to cart`);
                }}
                className="flex-1 bg-black hover:bg-gray-800 border border-gray-600 text-white py-2 rounded-xl transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 py-2 rounded-xl transition"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
