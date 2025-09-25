import { useNavigate } from "react-router-dom";
function ArtworkCard({ art }) {
    const navigate = useNavigate();

  return (
    <div className="bg-white/40 w-60 shadow-lg rounded-lg backdrop-blur-md">
      <div>
        <img
          src={art.image_url || "https://via.placeholder.com/200"}
          alt={art.title}
          className="rounded-lg w-full h-40 object-cover transform transition duration-300 ease-in hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="font-bold">{art.title}</p>
        <p>{art.artist?.name || "Unknown Artist"}</p>
        <p className="text-green-800 font-bold">${art.price}</p>
        <p>Available</p>
        <button 
        onClick={() => navigate(`/artworks/${art.id}`)}
        className="w-full bg-blue-400 active:ring-2 ring-blue-500 rounded-sm mt-2 text-white py-1">
          View
        </button>
      </div>
    </div>
  )
}

export default ArtworkCard
