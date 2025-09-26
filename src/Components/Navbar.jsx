import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white/30 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <nav className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <span className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <i className="fa-solid fa-palette text-purple-500"></i>
          <h1>Artisan</h1>
        </span>

        {/* Links */}
        <div className="flex gap-8 text-gray-700 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-purple-500 transition ${isActive ? "text-purple-500 font-semibold" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/artworks"
            className={({ isActive }) =>
              `hover:text-purple-500 transition ${isActive ? "text-purple-500 font-semibold" : ""}`
            }
          >
            Artworks
          </NavLink>
          <NavLink
            to="/artists"
            className={({ isActive }) =>
              `hover:text-purple-500 transition ${isActive ? "text-purple-500 font-semibold" : ""}`
            }
          >
            Artists
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/my-collection"
                className={({ isActive }) =>
                  `hover:text-purple-500 transition ${isActive ? "text-purple-500 font-semibold" : ""}`
                }
              >
                My Collection
              </NavLink>
              <NavLink
                to="/purchases"
                className={({ isActive }) =>
                  `hover:text-purple-500 transition ${isActive ? "text-purple-500 font-semibold" : ""}`
                }
              >
                Purchases
              </NavLink>
            </>
          )}

          {user?.role === "artist" && (
            <NavLink
              to="/uploads"
              className={({ isActive }) =>
                `hover:text-purple-500 transition ${isActive ? "text-purple-500 font-semibold" : ""}`
              }
            >
              Upload
            </NavLink>
          )}
        </div>

        {/* Auth Section */}
        <div className="flex gap-4 items-center">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition active:ring-2 ring-purple-400"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-2 rounded-lg border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition active:ring-2 ring-purple-400"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-gray-600 font-medium">
                Welcome, {user.userName || "User"}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition active:ring-2 ring-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;