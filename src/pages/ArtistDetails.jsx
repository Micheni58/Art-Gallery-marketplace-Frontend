import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/artists/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch artist");
        return res.json();
      })
      .then((data) => {
        setArtist(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artist:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading artist...</p>;
  if (!artist) return <p className="text-center mt-10">Artist not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-4xl">
        {/* Profile */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={artist.profile_pic || "https://via.placeholder.com/200?text=Artist"}
            alt={artist.name}
            className="rounded-full w-40 h-40 object-cover border-4 border-blue-400 shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{artist.name}</h1>
            <p className="text-gray-600 mt-2">{artist.bio || "No bio available."}</p>
          </div>
        </div>

        {/* Artworks */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Artworks by {artist.name}</h2>
          {artist.artworks && artist.artworks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {artist.artworks.map((art) => (
                <div
                  key={art.id}
                  className="bg-white/60 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={art.image_url || "https://via.placeholder.com/300"}
                    alt={art.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold">{art.title}</h3>
                    <p className="text-green-700 font-semibold">${art.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">This artist has no artworks yet.</p>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/artists")}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm font-medium"
          >
            ← Back to Artists
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArtistDetail;
