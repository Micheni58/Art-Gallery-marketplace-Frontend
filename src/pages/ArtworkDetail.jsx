import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/artworks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArt(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artwork:", err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://127.0.0.1:5000/artworks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Artwork deleted successfully!");
        navigate("/artworks");
      })
      .catch((err) => console.error("Error deleting artwork:", err));
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!art) return <p className="text-center">Artwork not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-lg p-6 w-full max-w-lg">
        <img
          src={art.image_url || "https://via.placeholder.com/400"}
          alt={art.title}
          className="rounded-lg w-full h-64 object-cover mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{art.title}</h1>
        <p className="text-gray-600 mb-2">By: {art.artist?.name || "Unknown Artist"}</p>
        <p className="text-green-800 font-bold mb-2">${art.price}</p>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => alert("Update form coming soon")}
            className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArtworkDetail;
