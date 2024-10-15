import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import Callback from "./components/Callback";
import Header from "./components/Header";
import "./assets/css/app.css";
import GamePage from "./pages/GamePage";
import GameSimulationPage from "./pages/GameSimulationPage";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/simulation/:gameId" element={<GameSimulationPage />} />
      </Routes>
    </>
  );
}
