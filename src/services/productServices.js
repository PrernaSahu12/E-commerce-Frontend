import API from "./api";
import toast from "react-hot-toast";


export const getAllProduct = async () => {
  try {
    const res = await API.get("/products");
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data || error.message);
    return []; 
  }
};


export const getProductById = async (id) => {
  try {
    const res = await API.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error.response?.data || error.message);
    toast.error("Failed to fetch product details");
    return null;
  }
};


export const createOrderCOD = async (orderData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in first.");

    const res = await API.post(
      "/orders/place",
      {
        ...orderData,
        paymentMethod: "COD",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error creating COD order:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
};


export const createOnlineOrder = async (orderData) => {
  try {
    console.debug("createOnlineOrder called", orderData);

    // Make sure token exists
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in first.");

    // Send request to backend using your API instance
    const res = await API.post("/orders/create-online", {
      ...orderData,
      paymentMethod: "Online",
    });

    return res.data;
  } catch (error) {
    console.error("Error creating online order:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      stack: error.stack,
    });
    // Return null on error to avoid undefined issues in frontend
    return null;
  }
};