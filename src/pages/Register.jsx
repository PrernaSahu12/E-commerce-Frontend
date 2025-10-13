import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill all fields");
      setLoading(false);
      return;
    }
    try {
      const payload = { name: name.trim(), email: email.trim(), password: password.trim() };
      const res = await API.post("/auth/register", payload);
      const { token, user } = res.data || {};

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user || {}));
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        alert("✅ Registration successful!");
        navigate("/login"); // redirect after register
      } else {
        alert("Registration failed: No token returned");
      }
    } catch (error) {
      const serverMsg =
        error.response?.data?.msg ||
        JSON.stringify(error.response?.data) ||
        error.message;
      console.error("Registration failed:", serverMsg);
      alert(`❌ Registration failed: ${serverMsg}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-16 p-8 border border-gray-700 rounded-lg shadow-lg bg-black text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Register</h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-semibold transition ${
            loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-black hover:bg-gray-800 border border-gray-600"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-300">
        Already have an account?{" "}
        <a href="/login" className="text-green-400 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}; 

export default Register;
