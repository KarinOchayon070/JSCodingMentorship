import React from "react";
import { useNavigate } from "react-router-dom";

function LobbyPage() {
  const navigate = useNavigate();

  const handleCodeBlockClick = (codeBlockTitle) => {
    navigate(`/codeblockpage/${codeBlockTitle}`);
  };

  return (
    <div className="LobbyPage">
      <h1 className="LobbyPageTitle">Choose Code Block</h1>
      <ul className="codesItemsList">
        <li onClick={() => handleCodeBlockClick("Async Case")}>Async case</li>
        <li onClick={() => handleCodeBlockClick("Array Manipulation")}>Array Manipulation</li>
        <li onClick={() => handleCodeBlockClick("Object Oriented Programming")}>Object Oriented Programming</li>
        <li onClick={() => handleCodeBlockClick("Recursion Examples")}>Recursion Examples</li>
      </ul>
    </div>
  );
}

export default LobbyPage;
