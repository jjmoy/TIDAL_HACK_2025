import React, { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import Home from "./Home";
import Crime from "./Crime";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => navigate("home")}
            className="focus:outline-none bg-white flex items-center space-x-2 cursor-pointer"
          >
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PinSafe</span>
          </button>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => navigate("home")} className="text-white focus:outline-none border:none hover:text-blue-300 bg-blue-700 transition-colors font-medium">Home</button>
            <button
              onClick={() => navigate("crime")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:text-blue-300 transition-colors font-semibold"
            >
              Use the App
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen((v) => !v)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => navigate("home")} className="text-white focus:outline:none hover:text-blue-300 bg-blue-700 border-blue-300 transition-colors font-medium">Home</button>
            <button
              onClick={() => navigate("crime")}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Use the App
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  return (
    // Force light UI (prevents Chrome auto-darkening) + clip any horizontal overflow
    <div className="min-h-screen w-full overflow-x-clip" style={{ colorScheme: "light", background: "#fff" }}>
      <Navigation />
      {currentPage === "home" ? (
        <Home onUseApp={() => navigate("crime")} />
      ) : (
        <Crime />
      )}
    </div>
  );
}
