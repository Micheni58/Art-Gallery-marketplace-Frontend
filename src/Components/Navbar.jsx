import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white/30 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <span className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-800">
          <i className="fa-solid fa-palette text-purple-500"></i>
          <h1 className="hidden sm:inline">Artisan</h1>
        </span>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          {!user && (
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-purple-500 transition ${isActive ? "text-purple-500 font-semibold" : ""}`
              }
            >
              Home
            </NavLink>
          )}
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

        {/* Desktop Auth Section */}
        <div className="hidden md:flex gap-4 items-center">
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
              <span className="text-gray-600 font-medium text-sm lg:text-base">
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

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/20 transition"
        >
          <i className={`fa-solid fa-${isMenuOpen ? "xmark" : "bars"} text-gray-800 text-xl`}></i>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/40 backdrop-blur-md border-t border-white/20 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-3 max-w-7xl mx-auto space-y-2">
            {/* Mobile Links */}
            {!user && (
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${isActive ? "bg-purple-500 text-white font-semibold" : "text-gray-700 hover:bg-white/20"}`
                }
              >
                Home
              </NavLink>
            )}
            <NavLink
              to="/artworks"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition ${isActive ? "bg-purple-500 text-white font-semibold" : "text-gray-700 hover:bg-white/20"}`
              }
            >
              Artworks
            </NavLink>
            <NavLink
              to="/artists"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition ${isActive ? "bg-purple-500 text-white font-semibold" : "text-gray-700 hover:bg-white/20"}`
              }
            >
              Artists
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/my-collection"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition ${isActive ? "bg-purple-500 text-white font-semibold" : "text-gray-700 hover:bg-white/20"}`
                  }
                >
                  My Collection
                </NavLink>
                <NavLink
                  to="/purchases"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition ${isActive ? "bg-purple-500 text-white font-semibold" : "text-gray-700 hover:bg-white/20"}`
                  }
                >
                  Purchases
                </NavLink>
              </>
            )}

            {user?.role === "artist" && (
              <NavLink
                to="/uploads"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${isActive ? "bg-purple-500 text-white font-semibold" : "text-gray-700 hover:bg-white/20"}`
                }
              >
                Upload
              </NavLink>
            )}

            {/* Mobile Auth Section */}
            <div className="pt-2 border-t border-white/20 space-y-2">
              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    onClick={closeMenu}
                    className="block px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition text-center"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={closeMenu}
                    className="block px-4 py-2 rounded-lg border border-purple-500 text-purple-700 hover:bg-purple-500 hover:text-white transition text-center"
                  >
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="px-4 py-2 text-gray-700 font-medium">
                    Welcome, {user.userName || "User"}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;