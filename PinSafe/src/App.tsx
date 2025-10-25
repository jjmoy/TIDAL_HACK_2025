import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { MapPage } from "./components/MapPage";
import "./styles/globals.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "map">("landing");

  return (
    <>
      {currentPage === "landing" ? (
        <LandingPage onNavigateToApp={() => setCurrentPage("map")} />
      ) : (
        <MapPage onNavigateHome={() => setCurrentPage("landing")} />
      )}
    </>
  );
}
