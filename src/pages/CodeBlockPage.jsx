import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";


const socket = io("http://localhost:3001");

function CodeBlockPage() {
  const { codeBlockTitle } = useParams();
  const [codeBlock, setCodeBlock] = useState({});
  const [isMentor, setIsMentor] = useState(null);
  
  console.log({isMentor})
  
  useEffect(() => {
    const getCodeBlock = async () => {
      try {
        const url = `http://localhost:3001/codeblockpage/${encodeURIComponent(
          codeBlockTitle
          )}`;
          const response = await fetch(url);
          const responseToJson = await response.json();
          
          setCodeBlock(responseToJson);
        } catch (err) {
          console.error("Error fetching code block:", err);
      }
    };
    
    getCodeBlock();


    socket.on("codeBlockUpdated", (updatedCodeBlock) => {
      setCodeBlock(updatedCodeBlock);
    });

    socket.emit("mentorStatus");

    socket.on("getMentorStatus", (isMentor) => {
      setIsMentor(isMentor);
    });

    return () => {
      socket.off("codeBlockUpdated");
      socket.off("mentorStatus");
    };
  }, [codeBlockTitle]);

  const handleCodeChange = (editor, data, value) => {
    if (!isMentor) {
      setCodeBlock((prevCodeBlock) => ({ ...prevCodeBlock, code: value }));
      socket.emit("codeBlockChange", { title: codeBlock.title, code: value });
    }
  };

  if (!codeBlock.title) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CodeBlockPage">
      <h1>{codeBlock.title}</h1>
      <pre>
        <CodeMirror
          value={codeBlock.code}
          onBeforeChange={(editor, data, value) => handleCodeChange(editor, data, value)}
          options={{
            mode: "javascript",
            theme: "material",
            lineNumbers: true,
            indentUnit: 2,
            tabSize: 2,
            autofocus: true,
            readOnly: isMentor,
          }}
        />
      </pre>
    </div>
  );
}

export default CodeBlockPage;
