// import TextField from "@mui/material/TextField";import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import VerticalTabs  from "./Tabs";
import Button from "@mui/material/Button";
import { DialogActions } from "@mui/material";
import { useState } from "react";

// const [open, setOpen] = useState(false);

// interface ModalProps {
//   onChange: (value: boolean) => void;
// }

function Modal(props: any) {
  const {
    onChange,
    cssLinesFromParent: cssCdnLines,
    jsLinesFromParent: jsCdnLines,
    onUpdateCdnLines,
  } = props;
  const [cssLinesFromParent, setCssLinesFromParent] = useState<string[]>([""]);
  const [jsLinesFromParent, setJsLinesFromParent] = useState<string[]>([""]);

  // Define a function to update the CSS and JS lines from the parent component
  const handleUpdateLines = (cssLines: string[], jsLines: string[]) => {
    setCssLinesFromParent(cssLines);
    setJsLinesFromParent(jsLines);
  };

  function handleSubmit() {
    onChange(false);
    onUpdateCdnLines(cssLinesFromParent, jsLinesFromParent);
  }
  function handleClose() {
    onChange(false);
  }

  const propsBack = {
    cssCdnLines,
    jsCdnLines,
  };

  return (
    <>
      <DialogTitle sx={{ bgcolor: "#3e4045", color: "#fff" }}>
        SandBox Setting
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "#3e4045", color: "#fff" }}>
        <VerticalTabs
          cssLines={cssLinesFromParent}
          jsLines={jsLinesFromParent}
          onUpdateLines={handleUpdateLines}
          onClick={propsBack}
        />
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#3e4045", color: "#fff" }}>
        <Button onClick={handleSubmit} sx={{ color: "#fff" }}>
          Submit
        </Button>
        <Button onClick={handleClose} sx={{ color: "#fff" }}>
          close
        </Button>
      </DialogActions>
    </>
  );
}

export default Modal;
