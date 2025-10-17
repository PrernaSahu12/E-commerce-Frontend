import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { getProductById, getAllProduct } from "../services/productServices";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);

        // Fetch related products from same category
        const all = await getAllProduct();
        const filtered = all.filter(
          (p) => p.category === data.category && p._id !== data._id
        );
        setRelated(filtered);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          className="w-full md:w-1/2 rounded-lg shadow"
         src={product.images.length > 0 ? `http://localhost:3000${product.images[0].url}` : "/fallback-image.jpg"}
          alt={product.name}
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-green-700 mb-4">
            ₹{product.price}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {related.map((item) => (
              <div
                key={item._id}
                className="bg-white p-3 rounded-lg shadow hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">₹{item.price}</p>
                <button
                  onClick={() => addToCart({ ...item, quantity: 1 })}
                  className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
