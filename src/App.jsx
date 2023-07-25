import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import CodeBlockPage from "./pages/CodeBlockPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LobbyPage />} />
          <Route
            path="/codeBlockPage/:codeBlockTitle"
            element={<CodeBlockPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
