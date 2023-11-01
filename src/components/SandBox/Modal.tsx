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
    metaLinesFromParent: metaCdnLines,
    cssLinesFromParent: cssCdnLines,
    jsLinesFromParent: jsCdnLines,
    onUpdateCdnLines,
  } = props;

  const [cssLinesFromParent, setCssLinesFromParent] = useState<string[]>([""]);
  const [jsLinesFromParent, setJsLinesFromParent] = useState<string[]>([""]);
  const [metaLinesFromParent, setMetaLinesFromParent] = useState<string[]>([
    "",
  ]);

  // Define a function to update the CSS and JS lines from the parent component
  const handleUpdateLines = (
    metaLines: string[],
    cssLines: string[],
    jsLines: string[]
  ) => {
    // console.log("metaLines", metaLines);
    // console.log("cssLines", cssLines);
    // console.log("jsLines", jsLines);
    setMetaLinesFromParent(metaLines);
    setCssLinesFromParent(cssLines);
    setJsLinesFromParent(jsLines);
  };

  function handleSubmit() {
    onChange(false);
    onUpdateCdnLines(
      metaLinesFromParent,
      cssLinesFromParent,
      jsLinesFromParent
    );
  }
  function handleClose() {
    onChange(false);
  }

  const propsBack = {
    metaCdnLines: metaCdnLines,
    cssCdnLines: cssCdnLines,
    jsCdnLines: jsCdnLines,
  };

  return (
    <>
      <DialogTitle>SandBox Setting</DialogTitle>
      <DialogContent>
        <VerticalTabs
          metaLines={metaLinesFromParent}
          cssLines={cssLinesFromParent}
          jsLines={jsLinesFromParent}
          onUpdateLines={handleUpdateLines}
          onClick={propsBack}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={handleClose}>close</Button>
      </DialogActions>
    </>
  );
}

export default Modal;
