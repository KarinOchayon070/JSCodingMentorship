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

  // The useEffect hook is used to fetch data related to the code block based on the codeBlockTitle parameter from the URL.
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

    // Set up a listener - used to update the code block in real-time when a change occurs.
    socket.on("codeBlockUpdated", (updatedCodeBlock) => {
      setCodeBlock(updatedCodeBlock);
    });
    
    // Check whether the user is a mentor.
    socket.emit("mentorStatus");

    // Set up a listener - used to determine if the user is a mentor or a student.
    socket.on("getMentorStatus", (isMentor) => {
      setIsMentor(isMentor);
    });

    // Returns a cleanup function to remove the Socket.IO event listeners when the component is unmounted.
    return () => {
      socket.off("codeBlockUpdated");
      socket.off("mentorStatus");
    };
  }, [codeBlockTitle]);

  // Triggered whenever the student enters or modifies their code.
  const handleCodeChange = (editor, data, value) => {

    // Updates the studentCode state with the entered code.
    setStudentCode(value);

    try {
      // Evaluate the student's code
      const studentFunc = new Function(value);
      const studentResult = studentFunc();

      console.log({studentResult})
      console.log(codeBlock.solution)

      // If the code executes successfully, it compares the result with the correct solution obtained from the codeBlock.solution property.
      setIsCodeCorrect(studentResult == codeBlock.solution);
    } catch (error) {
      setIsCodeCorrect(false);
    }
    
    // Providing the title and the student's code, so that other users (e.g., mentors) can see the updates in real-time.
    socket.emit("codeBlockChange", { title: codeBlock.title, code: value });
  };

  // While the code block is being fetched, a loading message is displayed.
  if (!codeBlock.title) {
    return <div className="loadingDiv">Loading...</div>;
  }

  // Once the code block data is available, the component renders the title, a logo image, and whether the user is a mentor or a student.
  return (
    <div className="CodeBlockPage">
      <a href={window.location.origin}>
        <img className="logoImage" src="/logo.png" alt="Logo" />
      </a>
      <h1 className="CodeBlockPageTitle">{codeBlock.title}</h1>
      {isMentor !== null && (
        <p>You are {isMentor ? "a mentor 🧑‍🏫" : "a student 🧑‍🎓"}</p>
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
            readOnly: isMentor, // Read only for the mentor
          }}
        />
      </pre>
      {isCodeCorrect && (
        <div className="correctCodeDiv">
          Congratulations! Code is correct 😄
        </div>
      )}
    </div>
  );
}

export default CodeBlockPage;
