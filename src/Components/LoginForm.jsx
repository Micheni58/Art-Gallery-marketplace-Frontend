import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    setFormData({ email: "", password: "" });
    setError("");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        login(data); // Save user data to context
        navigate("/artworks"); // Redirect to artworks page
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-6">
      <div className="p-8 w-full max-w-md border rounded shadow bg-white/80 backdrop-blur-md">
        <div className="text-center mb-6">
          <h1 className="font-bold text-2xl text-gray-800">Login</h1>
          <p className="text-gray-600">
            Access your account to continue exploring artworks!
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-10 px-3 mt-1 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-10 px-3 mt-1 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg hover:bg-purple-400 transition active:ring-2 ring-purple-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}