function Footer() {
  return (
    <>
      <div className="relative w-full mt-12 md:mt-16 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-black via-blue-400 to-gray-400 bg-[length:400%_400%]"></div>

        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-16">
          {/* Grid: responsive - 1 col on mobile, 3 cols on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-8">
            {/* Brand Section */}
            <div className="text-white">
              <div className="flex items-center gap-2 mb-4">
                <i className="fa-solid fa-palette text-blue-400 text-2xl sm:text-3xl"></i>
                <h2 className="text-xl sm:text-2xl font-bold">Artisan</h2>
              </div>
              <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                Discover and collect exceptional artworks from talented artists worldwide. Your gateway to contemporary and modern art.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-white">
              <h3 className="text-base sm:text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-300 transition duration-300 hover:translate-x-1 inline-block">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-300 transition duration-300 hover:translate-x-1 inline-block">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-300 transition duration-300 hover:translate-x-1 inline-block">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-300 transition duration-300 hover:translate-x-1 inline-block">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="text-white">
              <h3 className="text-base sm:text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gray-700/60 hover:bg-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram text-white text-lg sm:text-xl"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gray-700/60 hover:bg-blue-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-400/50"
                  aria-label="Twitter"
                >
                  <i className="fa-brands fa-twitter text-white text-lg sm:text-xl"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gray-700/60 hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-600/50"
                  aria-label="Facebook"
                >
                  <i className="fa-brands fa-facebook text-white text-lg sm:text-xl"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-600/40"></div>

          {/* Copyright */}
          <div className="pt-6 md:pt-8 text-center">
            <p className="text-gray-300 text-xs sm:text-sm">
              &copy; 2025 Artisan Gallery. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradientBG 15s ease infinite;
        }
      `}</style>
    </>
  );
}
export default Footer;
