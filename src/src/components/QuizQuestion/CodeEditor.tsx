import { MouseEvent, useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { styles } from "./Style";
// import axios from "axios";
import CompilerApi from "../../api/CompilerApi";


const files: any = {
  "script.js": {
    name: "script.js",
    language: "javascript",
  },
};
function CodeEditor() {
  const [fileName] = useState("script.js");
  const editorRef = useRef(null);
  const file = files[fileName];
  const [task, setTask] = useState({
    lang: "javascript",
    code: "",
  });
  const [response, setResponse] = useState({
    status: "0",
    message: "",
  });

  useEffect(() => {
    CompilerApi.getTask("javascript").then((res) => {
      console.log(res);
      setTask(res);
    });
  }, []);

  console.log("task", task);

  function handleEditorDidMount(editor: any, _monaco: any) {
    editorRef.current = editor;
  }

  const handleRun = (e: any) => {
    e.preventDefault();
    CompilerApi.run(task)
      .then((res) => {
        console.log("callback:",res);
        setResponse(res);
      })
      .catch((error) => {
        console.log(error);
        // Handle error here
      });
  };

  const handleCodeChange = (code: any) => {
    setTask((prevTask) => ({ ...prevTask, code }));
    console.log("Code",code);
  };
  // Function to clear the output screen
  function clearOutput(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setResponse({ status: "0", message: "" });
  }

  console.log("response -2", response.message);
  

  return (
    <div>
      <div className="mb-5">
        <Editor
          width="100%"
          height="50vh"
          theme="vs-dark"
          className=""
          value={task.code}
          onMount={handleEditorDidMount}
          defaultLanguage={file.language}
          onChange={handleCodeChange}
          path={file}></Editor>
      </div>
      <button onClick={handleRun} className={styles.buttonGreen}>
        compile code
      </button>
      <button className={styles.buttonGreen}>submit code</button>
      <div>
        <div className="mt-5">
          <div className="w-auto h-48 bg-gray-900 overflow-y-auto text-white relative mb-4">
            <pre className="text-base whitespace-pre-wrap p-5">
              {response.message}
            </pre>
          </div>
          <button
            className={styles.buttonGreen}
            onClick={(e) => {
              clearOutput(e);
            }}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
