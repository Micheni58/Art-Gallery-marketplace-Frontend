import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // Fetch some artworks to show on home page
    const fetchArtworks = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/artworks");
        const data = await res.json();
        setArtworks(data.slice(0, 6)); // show first 6 artworks
      } catch (err) {
        console.error(err);
      }
    };
    fetchArtworks();
  }, []);

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center min-h-[80vh] relative overflow-hidden">
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-black via-blue-300 to-gray-400 bg-[length:400%_400%]"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-white font-extrabold text-6xl md:text-7xl mb-6">
            Discover<br />Exceptional Art
          </h1>
          <p className="text-white text-xl md:text-2xl mb-8 max-w-xl mx-auto">
            Explore curated collections from emerging and established artists worldwide
          </p>
          <button
            onClick={() => navigate("/artworks")}
            className="w-full md:w-auto bg-blue-400 text-white font-semibold py-2 px-8 rounded-lg hover:bg-purple-400 transition duration-300 active:ring-2 ring-purple-500"
          >
            Explore Artworks
          </button>
        </div>
      </div>

      {/* Artworks Section */}
      <div className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Featured Artworks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-lg shadow overflow-hidden hover:scale-105 transform transition duration-300"
            >
              <img
                src={art.image_url || "https://via.placeholder.com/400"}
                alt={art.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{art.title}</h3>
                <p className="text-gray-600 mt-1">${art.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Animation */}
      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradientBG 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
