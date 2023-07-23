import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import CodeBlockPage from "./pages/CodeBlockPage";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<LobbyPage />} />
      <Route path="/codeBlockPage/:codeBlockTitle" element={<CodeBlockPage />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
