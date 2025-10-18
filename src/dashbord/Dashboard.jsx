import React, { useState } from "react";
import API from "../services/api";

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, images: [...e.target.files] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    formData.images.forEach((img) => data.append("images", img));

    try {
      const res = await API.post("/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201 || res.status === 200) {
        alert("Product created successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          images: [],
        });
      } else {
        alert("Something went wrong while creating product.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      const msg =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        "Server error";
      alert(` ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-black text-white shadow-lg rounded-2xl p-6 mt-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">
        Create Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-300">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-600 p-2 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-300">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-600 p-2 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-300">Price ($)</label>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-600 p-2 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-300">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-600 p-2 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-300">Stock</label>
          <input
            type="number"
            name="stock"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full border border-gray-600 p-2 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-300">
            Images (multiple allowed)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-600 p-2 rounded-md bg-gray-900 text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md font-medium transition ${
            loading
              ? "bg-gray-700 cursor-not-allowed text-white"
              : "bg-black hover:bg-gray-800 border border-gray-600 text-white"
          }`}
        >
          {loading ? "Uploading..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
