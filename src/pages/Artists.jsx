import { useEffect, useState } from "react";
import ArtistCard from "../Components/ArtistCard";

function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("https://art-gallery-marketplace-backend.onrender.com/artists")
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch((err) => console.error("Error fetching artists:", err));
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Featured Artists</h1>
      <p className="text-center text-gray-700 mb-8">
        Discover the talented artists behind our curated collection. Each brings their unique vision and expertise to create exceptional works of art
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default Artists;
