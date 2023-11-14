import Editor from "@monaco-editor/react";
// import * as monaco from "monaco-editor";

import { useState } from "react";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";

import "../../pages/SandBox.css";
import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  language: string;
  value: string;
  onChange: (value: string) => void;
}

function SandBoxEditor({ title, language, value, onChange }: Props) {
  const [open, setOpen] = useState(true);
  const [checked, setChecked] = useState(true);

    // loader.init().then((monaco) => {
    //   monaco.editor.defineTheme("myCustomTheme", {
    //     base: "vs",
    //     inherit: true,
    //     rules: [],
    //     colors: {
    //       "editor.background": "#d3d3d3",
    //       "editorGutter.background": "#263238",
    //       "editor.rangeHighlightBackground": "#000",
    //       "editor.lineHighlightBackground": "#263238",
    //       "editor.lineHighlightBorder": "#000",
    //     },
    //   });
    // });

  const handleChanges = () => {
    setChecked((prev) => !prev);
  };

  function handleEditorChange(value: string | undefined) {
    if (value) {
      // console.log("value", value);
      onChange(value);
    }
  }

  return (
    <Box className={`editor-container ${open ? "" : "collapse"}`} >
      <Typography className="editorCode-title">
        {title}
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChanges} />}
          label="Show"
          sx={{ marginLeft: "10px", marginRight: "-10px" }}
        />
      </Typography>
      <Box>
        <Collapse in={checked} unmountOnExit={true}>
          <div>
            <Editor
              height="30vh"
              defaultLanguage={language}
              defaultValue={value}
              onChange={handleEditorChange}
              theme="vs-dark"
              className="editorCode-wrapper"
            />
          </div>
        </Collapse>
      </Box>
    </Box>
  );
}

export default SandBoxEditor;
