import { useEffect, useState } from "react";

function ArtworkCard() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/artworks") 
      .then((res) => res.json())
      .then((data) => setArtworks(data))
      .catch((err) => console.error("Error fetching artworks:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {artworks.map((art) => (
        <div
          key={art.id}
          className="bg-gray-200 w-60 shadow-lg rounded-lg transform transition duration-300 ease-in-out hover:scale-105"
        >
          <div>
            <img
              src={art.image_url || "https://via.placeholder.com/200"}
              alt={art.title}
              className="rounded-lg w-full h-40 object-cover"
            />
          </div>
          <div className="p-3">
            <p className="font-bold">{art.title}</p>
            <p>{art.artist?.name || "Unknown Artist"}</p>
            <p className="text-green-800 font-bold">${art.price}</p>
            <p>Available</p>
            <button className="w-full bg-blue-400 hover:bg-blue-500 active:ring-2 ring-blue-500 rounded-sm mt-2 text-white py-1">
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArtworkCard;
