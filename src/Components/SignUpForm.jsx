import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [formData, setFormData] = useState({ userName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    setFormData({ userName: "", email: "", password: "" });
    setError("");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
      } else {
        alert("Signup successful! You can now login.");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-6">
      <div className="p-8 w-full max-w-md border rounded shadow bg-white">
        <div className="text-center mb-6">
          <h1 className="font-bold text-2xl text-gray-800">Signup</h1>
          <p className="text-gray-600">Create your account to join the Art Gallery Marketplace!</p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            className="w-full h-10 px-3 mt-1 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
