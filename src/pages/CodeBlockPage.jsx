import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";

const socket = io(process.env.REACT_APP_BASE_URL);

function CodeBlockPage() {
  const { codeBlockTitle } = useParams();
  const [codeBlock, setCodeBlock] = useState({});
  const [isMentor, setIsMentor] = useState(null);
  const [studentCode, setStudentCode] = useState("");
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);

  useEffect(() => {
    const getCodeBlock = async () => {
      try {
        const url = `${
          process.env.REACT_APP_BASE_URL
        }/codeblockpage/${encodeURIComponent(codeBlockTitle)}`;
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
    setStudentCode(value);

    try {
      // Evaluate the student's code
      const studentFunc = new Function(value);
      const studentResult = studentFunc();

      console.log({studentResult})
      console.log(codeBlock.solution)

      setIsCodeCorrect(studentResult == codeBlock.solution);
    } catch (error) {
      setIsCodeCorrect(false);
    }
    
    socket.emit("codeBlockChange", { title: codeBlock.title, code: value });
  };

  if (!codeBlock.title) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CodeBlockPage">
      <img className="logoImage" src="/logo.png" alt="Logo" />
      <h1 className="CodeBlockPageTitle">{codeBlock.title}</h1>
      {isMentor !== null && (
        <p>You are {isMentor ? "a mentor" : "a student"}.</p>
      )}
      <pre className="codeContainer">
        <CodeMirror
          value={studentCode || codeBlock.code}
          onBeforeChange={(editor, data, value) =>
            handleCodeChange(editor, data, value)
          }
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
      {isCodeCorrect && (
        <div
          style={{
            fontSize: "60px",
            textAlign: "center",
            color: "#00A8B5",
            fontFamily: "Calibri",
          }}
        >
          Congratulations! Code is correct 😄
        </div>
      )}
    </div>
  );
}

export default CodeBlockPage;
