import { useNavigate } from "react-router-dom";

function ArtworkCard({ art }) {
  const navigate = useNavigate();

  // Helper to handle both local and external images
  const getImageSrc = (url) => {
    if (!url) return "https://via.placeholder.com/200";
    return url.startsWith("http") ? url : `https://art-gallery-marketplace-backend.onrender.com${url}`;
  };

  return (
    <div className="bg-white/40 w-60 shadow-lg rounded-lg backdrop-blur-md overflow-hidden">
      <div className="relative">
        <img
          src={getImageSrc(art.image_url)}
          alt={art.title || "Untitled"}
          className="rounded-t-lg w-full h-40 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          onError={(e) => (e.target.src = "https://via.placeholder.com/200")} // fallback
        />
      </div>
      <div className="p-3">
        <p className="font-bold">{art.title || "Untitled"}</p>
        <p className="text-gray-600">{art.artist?.name || "Unknown Artist"}</p>
        <p className="text-green-800 font-bold">${art.price || "N/A"}</p>
        <p
          className={`font-semibold ${art.sold ? "text-red-600" : "text-green-600"}`}
        >
          {art.sold ? "Sold" : "Available"}
        </p>
        <button
          onClick={() => navigate(`/artworks/${art.id}`)}
          className="w-full bg-blue-400 active:ring-2 ring-blue-500 rounded-sm mt-2 text-white py-1 hover:bg-blue-500"
        >
          View
        </button>
      </div>
    </div>
  );
}

export default ArtworkCard;
