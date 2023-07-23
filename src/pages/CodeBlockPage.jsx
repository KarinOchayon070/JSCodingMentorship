import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css"; // Replace 'material' with your desired theme
import "codemirror/mode/javascript/javascript";

const socket = io("http://localhost:3001");

function CodeBlockPage() {
  const { codeBlockTitle } = useParams();
  const [codeBlock, setCodeBlock] = useState({});

  useEffect(() => {
    const getCodeBlock = async () => {
      // Fetch the code block data from the server based on the selected title
      try {
        const url = `http://localhost:3001/codeblockpage/${encodeURIComponent(
          codeBlockTitle
        )}`;
        const response = await fetch(url);
        const responseToJson = await response.json()

        setCodeBlock(responseToJson);
      } catch (err) {
        //
      }
    };

    getCodeBlock();

    socket.on("codeBlockUpdated", (updatedCodeBlock) => {
      setCodeBlock(updatedCodeBlock);
    });

    return () => {
      socket.off("codeBlockUpdated");
    };
  }, [codeBlockTitle]);

  const handleCodeChange = (editor, data, value) => {
    // Update the state with the edited code
    setCodeBlock((prevCodeBlock) => ({ ...prevCodeBlock, code: value }));

    // Emit the codeBlockChange event to notify the backend of the code change
    socket.emit("codeBlockChange", { title: codeBlock.title, code: value });
  };

  if (!codeBlock) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CodeBlockPage">
      <h1>{codeBlock.title}</h1>
      <pre>
        <CodeMirror
          value={codeBlock.code}
          onBeforeChange={handleCodeChange}
          options={{
            mode: "javascript",
            theme: "material",
            lineNumbers: true,
            indentUnit: 2,
            tabSize: 2,
            autofocus: true,
          }}
        />
      </pre>
    </div>
  );
}

export default CodeBlockPage;
