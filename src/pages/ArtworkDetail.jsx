import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/artworks/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch artwork");
        return res.json();
      })
      .then((data) => {
        setArt(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artwork:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBuy = () => {
    const user = localStorage.getItem("user"); // or your auth context
    if (user) {
      navigate(`/purchases/${id}`);
    } else {
      navigate("/login");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading artwork...</p>;
  if (!art) return <p className="text-center mt-10">Artwork not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-3xl relative">
        {/* Artwork Image */}
        <img
          src={art.image_url || "https://via.placeholder.com/600"}
          alt={art.title}
          className="rounded-xl w-full h-[400px] object-cover shadow-md mb-6 transition-transform duration-500 hover:scale-105"
        />

        {/* Artwork Info */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{art.title}</h1>
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-semibold">Artist:</span>{" "}
          {art.artist?.name || "Unknown Artist"}
        </p>
        <p className="text-lg text-green-700 font-bold mb-2">${art.price}</p>
        <p className="text-sm text-gray-600 mb-6">
          Status:{" "}
          <span
            className={`font-semibold ${
              art.sold ? "text-red-600" : "text-green-600"
            }`}
          >
            {art.sold ? "Sold" : "Available"}
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/artworks")}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm font-medium"
          >
            ← Back
          </button>

          {/* Buy Button */}
          {!art.sold && (
            <button
              onClick={handleBuy}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md"
            >
              Buy
            </button>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Interested? Sign up or log in to purchase or upload your own
            artwork.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArtworkDetail;
