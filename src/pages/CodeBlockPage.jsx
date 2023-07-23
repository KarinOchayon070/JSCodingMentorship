import React from "react";
import { useParams } from "react-router-dom";

function CodeBlockPage() {
    
/*
    In the LobbyPage, I'm passing the codeBlockTitle as a parameter to the URL when i'm navigate to the CodeBlockPage.
    Now, in the CodeBlockPage component, I can access this parameter using React Router's useParams hook and display it in the h1 element.
 */
  const { codeBlockTitle } = useParams();

  return (
    <div className="CodeBlockPage">
      <h1 className="CodeBlockPageTitle">Welcome To {codeBlockTitle} Code Block</h1>
    </div>
  );

}

export default CodeBlockPage;
