function ArtistCard({ artist }) {
  return (
    <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-lg p-4 hover:shadow-xl transition">
      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          src={
            artist.profile_pic ||
            "https://via.placeholder.com/150?text=Artist"
          }
          alt={artist.name}
          className="rounded-full w-28 h-28 object-cover border-4 border-blue-300 shadow-md"
        />
      </div>

      {/* Info */}
      <div className="text-center mt-4">
        <h2 className="font-bold text-lg">{artist.name}</h2>
        <p className="text-gray-600 text-sm">
          {artist.bio || "No bio available."}
        </p>
      </div>

      {/* Button */}
      <div className="mt-4 flex justify-center">
        <button className="w-full p-2 rounded-lg bg-blue-400 text-white active:ring-2 ring-blue-400 transition">
          View Profile
        </button>
      </div>
    </div>
  );
}

export default ArtistCard;
