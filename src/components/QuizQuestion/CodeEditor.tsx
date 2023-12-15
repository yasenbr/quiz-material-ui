import { MouseEvent, useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import CompilerApi from "../../api/CompilerApi";
import Box, { BoxProps } from "@mui/material/Box";
import { useAuth } from "../../auth/AuthContext";


// Function to create a box for the output screen and set its properties
function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

// Function to extract error information from the response
//note that error return by node are not  error because node return  something  that way we need to look for ky word in the return message
function extractErrorInfo(res: any) {
  if (res.message.includes("ReferenceError:") || res.message.includes("TypeError:")|| res.message.includes("SyntaxError:")) {
    const lines = res.message.split("\n");

    let filePath = null;
    let lineWithError = null;
    let errorMessage = null;
    let message = [];

    console.log("lines", lines.length);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("C:")) {
        filePath = line;
        // Check if there's a colon followed by a line number
        const lineMatch = line.match(/:(\d+)$/);
        if (lineMatch) {
          lineWithError = parseInt(lineMatch[1]);
        }
      } else if (line.includes("ReferenceError") || line.includes("TypeError") || line.includes("SyntaxError")) {
        errorMessage = line;
      }
    }
    errorMessage
      ? message.push(errorMessage + " at line " + lineWithError)
      : "";

    return {
      message,
    };
  } else {
    return res;
  }
}

const files: any = {
  "script.js": {
    name: "script.js",
    language: "javascript",
  },
};

function CodeEditor(taskProps: any) {
  const { user } = useAuth();
  console.log("user", user);
  
  console.log("taskProps", taskProps);

  const [info] = taskProps.info;
  const [fileName] = useState("script.js");
  const editorRef = useRef(null);
  const file = files[fileName];
  const [task, setTask] = useState({
    id: user,
    lang: "javascript",
    code: "",
  });
  const [response, setResponse] = useState({
    status: "0",
    message: "",
  });

  console.log("title", info);

  // Function to get the task from the server

  // useEffect(() => {
  //   CompilerApi.getTask("javascript").then((res) => {
  //     console.log(res);
  //     setTask(res);
  //   });
  // }, []);

  // console.log("task", task);

  // Function to handle the editor

  function handleEditorDidMount(editor: any, _monaco: any) {
    editorRef.current = editor;
  }

  // Function to handle the run button

  const handleRun = (e: any) => {
    e.preventDefault();
    console.log("task", task);
    
    CompilerApi.run(task)
      .then((res) => {
        console.log("callback:", res);
        const message = extractErrorInfo(res);
        console.log("message", message);
        setResponse(message);
      })
      .catch((error) => {
        console.log(error);
        // Handle error here
      });
  };

  const handleCodeChange = (code: any) => {
    setTask((prevTask) => ({ ...prevTask, code }));
    console.log("Code", code);
  };
  // Function to clear the output screen
  function clearOutput(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setResponse({ status: "0", message: "" });
  }

  console.log("response -2", response);

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1/2,
        }}>
        <Item
          sx={{
            p: 2,
            backgroundColor: "#3e4044",
            color: "#d3d3d3",
            borderColor: "868686",
            boxShadow: 4,
          }}>
          <Typography variant="h6">{info.title}</Typography>
          <Typography paragraph sx={{ color: "#d3d3d3" }}>
            {info.description}
          </Typography>
        </Item>
        <Item
          sx={{
            backgroundColor: "#3e4044",
            color: "#d3d3d3",
            borderColor: "868686",
            boxShadow: 4,
          }}>
          <Editor
            width="auto"
            height="60vh"
            theme="vs-dark"
            value={task.code}
            onMount={handleEditorDidMount}
            defaultLanguage={file.language}
            onChange={handleCodeChange}
            path={file}></Editor>
          <Button onClick={handleRun} variant="contained" sx={{ mt: 2 }}>
            Execute
          </Button>
          {/* <Button variant="contained" sx={{ mt: 2, ml: 2 }}>
            submit code
          </Button> */}
        </Item>
        <Item
          sx={{
            backgroundColor: "#3e4044",
            color: "#d3d3d3",
            borderColor: "868686",
            boxShadow: 4,
          }}>
          <Typography
            paragraph
            height="60vh"
            bgcolor={"black"}
            color={"white"}
            sx={{ p: 2 }}>
            <pre>{response.message}</pre>
          </Typography>
          <Button
            variant="contained"
            onClick={(e) => {
              clearOutput(e);
            }}>
            Clear
          </Button>
        </Item>
      </Box>
    </>
  );
}

export default CodeEditor;
