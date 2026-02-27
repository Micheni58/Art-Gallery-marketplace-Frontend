import { useNavigate } from "react-router-dom";

function ArtworkCard({ art }) {
  const navigate = useNavigate();

  // Helper to handle both local and external images
  const getImageSrc = (url) => {
    if (!url) return "https://via.placeholder.com/200";
    return url.startsWith("http") ? url : `https://art-gallery-marketplace-backend.onrender.com${url}`;
  };

  return (
    <div 
      className="group relative bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-600 hover:border-blue-400"
      onClick={() => navigate(`/artworks/${art.id}`)}
    >
      {/* Image Container */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-800/60">
        <img
          src={getImageSrc(art.image_url)}
          alt={art.title || "Untitled"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => (e.target.src = "https://via.placeholder.com/400")} // fallback
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Title */}
        <h3 className="font-bold text-sm sm:text-base text-white line-clamp-2 mb-1">
          {art.title || "Untitled"}
        </h3>
        
        {/* Artist Name */}
        <p className="text-xs sm:text-sm text-gray-400 mb-2 truncate">
          {art.artist?.name || "Unknown Artist"}
        </p>
        
        {/* Price and Status */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-blue-400 font-bold text-sm sm:text-base">
            ${art.price || "N/A"}
          </p>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              art.sold 
                ? "bg-red-500/30 text-red-200" 
                : "bg-green-500/30 text-green-200"
            }`}
          >
            {art.sold ? "Sold" : "Available"}
          </span>
        </div>
        
        {/* View Button */}
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:ring-2 ring-blue-400 rounded-lg text-white font-semibold py-2 transition-all duration-200 text-sm sm:text-base"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default ArtworkCard;
