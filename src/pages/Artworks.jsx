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
    <div className="p-4 min-h-screen bg-gradient-to-r from-purple-300 via-purple-200 to-blue-200">
      <h1 className="text-3xl mb-4">Artworks Page</h1>
      <p className="mb-6">
        Explore our curated collection of exceptional artworks from talented
        artists around the world.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artworks.map((art) => (
          <ArtworkCard key={art.id} art={art} />
        ))}
      </div>
    </div>
  )
}

export default Artworks
