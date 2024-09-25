import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LogProvider } from "../src/components/LogContext";

import Main from "./pages/Main";
import ArtworkPage from "./pages/ArtworkPage";
import NewArtwork from "./pages/NewArtwork";
import BasicInfoPage from "./pages/BasicInfoPage";
import ConsentFormPage from "./pages/ConsentFormPage";
import ArtworkPageStudy from "./pages/ArtworkPageStudy";
import EndPage from "./pages/EndPage";
import EvaluationPage from "./pages/EvaluationPage";

function App() {
  return (
    <LogProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/artwork/:id" element={<ArtworkPage />} />
          <Route path="/new" element={<NewArtwork />} />
          <Route path="/:pid" element={<ConsentFormPage />} />
          <Route path="/:pid/info" element={<BasicInfoPage />} />
          <Route path="/:pid/:tid" element={<ArtworkPageStudy />} />
          <Route path="/:pid/end" element={<EndPage />} />
          <Route path="/:pid/:tid/evaluation" element={<EvaluationPage />} />
        </Routes>
      </Router>
    </LogProvider>
  );
}

export default App;
