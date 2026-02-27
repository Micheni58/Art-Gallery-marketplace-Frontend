import { useEffect, useState } from "react"
import ArtworkCard from "../Components/ArtworkCard"

function Artworks() {
  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    fetch("https://art-gallery-marketplace-backend.onrender.com/artworks")
      .then((res) => res.json())
      .then((data) => setArtworks(data))
      .catch((err) => console.error("Error fetching artworks:", err))
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-black via-blue-300 to-gray-400 bg-[length:400%_400%]"></div>
      {/* Header Section */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
          Artworks Gallery
        </h1>
        <p className="text-gray-300 font-medium sm:text-base md:text-lg max-w-2xl leading-relaxed">
          Explore our curated collection of exceptional artworks from talented
          artists around the world.
        </p>
      </div>

      {/* Artworks Grid */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {artworks.map((art) => (
            <ArtworkCard key={art.id} art={art} />
          ))}
        </div>
      </div>
      {/* Gradient Animation Style (same as Home) */}
      <style>{`\n        @keyframes gradientBG {\n          0% { background-position: 0% 50%; }\n          50% { background-position: 100% 50%; }\n          100% { background-position: 0% 50%; }\n        }\n        .animate-gradient {\n          animation: gradientBG 15s ease infinite;\n        }\n      `}</style>
    </div>
  )
}

export default Artworks
