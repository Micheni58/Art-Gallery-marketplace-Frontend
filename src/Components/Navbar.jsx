import { NavLink } from "react-router-dom"
import { useState } from "react"

function Navbar() {
  // 🔹 Replace this with actual auth logic (context, redux, etc.)
  const [user, setUser] = useState(null) // null = not logged in

  return (
    <div className="bg-white/60 backdrop-blur-md sticky top-0 z-40 shadow-md">
      <nav className="flex items-center justify-between px-8 py-4">

        <span className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <i className="fa-solid fa-palette text-purple-400"></i>
          <h1>Artisan</h1>
        </span>

        <div className="flex gap-8 text-gray-700 font-medium">
          <NavLink to="/" className="hover:text-pink-500 transition">Home</NavLink>
          <NavLink to="/artworks" className="hover:text-purple-500 transition">Artworks</NavLink>
          <NavLink to="/artists" className="hover:text-purple-500 transition">Artists</NavLink>
          <NavLink to="/my-collection" className="hover:text-purple-500 transition">My Collection</NavLink>
          <NavLink to="/purchases" className="hover:text-purple-500 transition">Purchase</NavLink>
          <NavLink to="/uploads" className="hover:text-purple-500 transition">Upload</NavLink>
        </div>

        {/* Right Side Auth Links */}
        <div className="flex gap-4">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-lg bg-purple-400 text-white hover:bg-pink-600 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="p-2 rounded-lg border border-purple-400 text-purple-500 hover:bg-purple-500 hover:text-white transition"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-gray-600">Welcome, {user.name}</span>
              <button
                onClick={() => setUser(null)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
