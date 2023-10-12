import { Box, Button, Dialog, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ViewInArSharpIcon from "@mui/icons-material/ViewInArSharp";
import SandBoxEditor from "../components/SandBox/SandBoxEditor";
import Modal from "../components/SandBox/Modal";
import "./SandBox.css";

function SandBox() {
  const [cssCdnLines, setCssCdnLines] = useState<string[]>([""]);
  const [jsCdnLines, setJsCdnLines] = useState<string[]>([""]);
  const [open, setOpen] = useState(false);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const cssCdnLinks = cssCdnLines
        .map((line) => `<link rel="stylesheet" href="${line}" />`)
        .join("");
      const jsCdLinks = jsCdnLines
        .map((line) => `<script src="${line}"></script>`)
        .join("");
      const htmlDocument = `
      <html lang="en" class="">
        <head>
          <meta charset="UTF-8">
          ${cssCdnLinks}
          <style>${css}</style>
        </head>
        <body>
        <div id="root">${html}</div>
        </body>
        <script>${js}</script>
        ${jsCdLinks}
        <script>
        let link = document.getElementByTagName("a");
        link.addEventListener("click", function(e) {
            e.preventDefault();
        });</script>
      </html>
    `;
      setSrcDoc(htmlDocument);
    }, 250);

    // Clear the timeout and remove the event listener when the component unmounts
    return () => {
      clearTimeout(timeout);
    };
  }, [cssCdnLines, html, css, js]);

  //define a function to update the CSS and JS lines from the parent component
  const handleUpdateCdnLines = (
    cssLinesFromParent: string[],
    jsLinesFromParent: string[]
  ) => {
    setCssCdnLines(cssLinesFromParent);
    setJsCdnLines(jsLinesFromParent);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#3E4046" }}>
      <div className="top-panel">
        <Grid
          container
          sx={{
            height: "auto",
            marginBottom: { xs: "auto", sm: "auto", md: 0 },
          }}>
          <Grid container sx={{ height: "auto", mb: "-20px" }}>
            <Grid item xs={12} sm={7}>
              <Box display="flex" flexDirection="row">
                <Box>
                  <ViewInArSharpIcon
                    className="para1"
                    style={{ marginTop: 19, marginLeft: 10 }}
                  />
                </Box>
                <Box>
                  <p className="para" style={{ marginTop: 15, marginLeft: 10 }}>
                    SandBox Code
                  </p>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "orange",
                      mt: "10px",
                      ml: "25px",
                      ":hover": { bgcolor: "#ff7b00" },
                    }}
                    onClick={handleClickOpen}>
                    Settings
                  </Button>
                </Box>
              </Box>
              <Dialog open={open} onClose={handleClose}>
                <Modal
                  cssLinesFromParent={cssCdnLines}
                  jsLinesFromParent={jsCdnLines}
                  onUpdateCdnLines={handleUpdateCdnLines}
                  onChange={setOpen}
                />
              </Dialog>
            </Grid>
          </Grid>

          <Grid container sx={{ height: "auto" }}>
            <Grid item md={4} sm={12} xs={12}>
              <SandBoxEditor
                title="HTML"
                language="html"
                value={html}
                onChange={setHtml}
              />
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <SandBoxEditor
                title="CSS"
                language="css"
                value={css}
                onChange={setCss}
              />
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <SandBoxEditor
                title="JS"
                language="javascript"
                value={js}
                onChange={setJs}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ height: "50vh" }}>
          <Grid item xs={12} md={12}>
            <div
              style={{
                backgroundColor: "#3E4046",
                paddingLeft: 12,
                paddingRight: 12,
                paddingBottom: 10,
                height: "100%",
              }}>
              <iframe
                id="myIframe"
                srcDoc={srcDoc}
                title="output"
                sandbox="same-origin allow-scripts"
                width="100%"
                height="100%"
                style={{
                  backgroundColor: "lightgray",
                  outline: "none",
                  border: "none",
                  borderRadius: 10,
                }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default SandBox;
