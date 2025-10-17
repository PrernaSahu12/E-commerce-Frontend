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
    // If parent already passed products via props, skip fetching here
    if (propsProducts && propsProducts.length > 0) {
      console.debug("ProductList: using products from props", propsProducts.length);
      setProducts(propsProducts);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        console.debug("ProductList fetched products:", data?.length);
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
if (!products || products.length === 0) {
  return <p className="text-center mt-10">No Products</p>;
}

  // Filter + search + sort
  let displayedProducts = products;
console.log(displayedProducts);


  if (category !== "all") {
    displayedProducts = displayedProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  displayedProducts = displayedProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "price-asc") {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">🛍️ All Products</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded"
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
          className="w-full sm:w-1/3 p-2 border rounded focus:outline-blue-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all"
          >
            <img
         src={product.images.length > 0 ? `http://localhost:3000${product.images[0].url}` : "/fallback-image.jpg"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl"
            />
            <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.name} added to cart`);
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-xl hover:bg-gray-300 transition"
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
