import { Box, Button, Dialog, Grid } from "@mui/material";
import { useEffect, useRef, useReducer } from "react";
import ViewInArSharpIcon from "@mui/icons-material/ViewInArSharp";
import SandBoxEditor from "../components/SandBox/SandBoxEditor";
import Modal from "../components/SandBox/Modal";
import "./SandBox.css";

function SandBox() {
  const [event, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      console.log("newEvent-sandbox", newEvent);
      return newEvent;
    },
    {
      html: "",
      css: "",
      js: "",
      srcInfo: "",
      open: false,
      metaCdnLines: [""],
      cssCdnLines: [""],
      jsCdnLines: [""],
    }
  );

  // const [cssCdnLines, setCssCdnLines] = useState<string[]>([""]);
  // const [jsCdnLines, setJsCdnLines] = useState<string[]>([""]);
  // const [metaCdnLines, setMetaCdnLines] = useState<string[]>([""]);
  // const [open, setOpen] = useState(false);
  // const [html, setHtml] = useState("");
  // const [css, setCss] = useState("");
  // const [js, setJs] = useState("");
  // const [srcInfo, setSrcInfo] = useState("");
  // const [PreviousIframeRef, setPreviousIframeRef] =
  //   useState<HTMLIFrameElement | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updateIframe = () => {
    const cssCdnLinks = event.cssCdnLines
      .map((line: any) => `<link rel="stylesheet" href="${line}"/>`)
      .join("");
    const jsCdLinks = event.jsCdnLines
      .map((line: any) => `<script src="${line}"></script>`)
      .join("");
      const metaCdnLinks = event.metaCdnLines.map((line:any)=>`${line}`)
    console.log(event.metaCdnLines);
    const htmlDocument = `
    <html lang="en" class="">
      <head>
        <title>temp document</title>
        <meta charset="UTF-8">
        ${metaCdnLinks}
        ${cssCdnLinks}
        <style>${event.css}</style>
      </head>
      <body>
        <div id="root">${event.html}</div>
      </body>
      <script>${event.js}</script>
      ${jsCdLinks}
    </html>
  `;
    if (iframeRef.current) {
      iframeRef.current.srcdoc = htmlDocument;
    }
  };

  useEffect(() => {
    updateIframe();
  }, [
    event.cssCdnLines,
    event.html,
    event.css,
    event.jsCdnLines,
    event.js,
    iframeRef,
    event.metaCdnLines,
  ]);

  function myIframeLoad() {
    //execute link inside iframe
    //first link  is for scrolling inside the box
    //second link is loading outer links
    const iframe: any = document.getElementById("myIframe");
    let links = [];
    if (iframe && iframe.contentDocument) {
      links = iframe.contentDocument.getElementsByTagName("a");
      for (let i = 0; i < links.length; i++) {
        let link = links[i];
        link.addEventListener("click", function (e: any) {
          e.preventDefault();
          let href = e.target.href;
          if (href.includes("sandbox#")) {
            let hash = href.split("#")[1];
            console.log(hash);
            iframe.contentWindow.location.hash = "#" + hash;
          } else {
            //Save the link in State to update the iframe in myFrame
            if (href.startsWith("http://") || href.startsWith("https://")) {
              updateEvent({ srcInfo: href });
            }
          }
        });
      }
    }
  }

  const myFrame = (data: any) => {
    if (data !== "") {
      return (
        <div>
          <iframe
            src={data}
            id="myIframe"
            width="100%"
            height="500px"
            style={{
              backgroundColor: "lightgray",
              outline: "none",
              border: "none",
              borderRadius: 10,
            }}
          />
        </div>
      );
    } else {
      return (
        <iframe
          id="myIframe"
          ref={iframeRef}
          onLoad={myIframeLoad}
          width="100%"
          height="100%"
          style={{
            backgroundColor: "lightgray",
            outline: "none",
            border: "none",
            borderRadius: 10,
          }}
        />
      );
    }
  };

  const handleUpdateCdnLines = (
    metaLinesFromParent: string[],
    cssLinesFromParent: string[],
    jsLinesFromParent: string[]
  ) => {
    updateEvent({ metaCdnLines: metaLinesFromParent });
    updateEvent({ cssCdnLines: cssLinesFromParent });
    updateEvent({ jsCdnLines: jsLinesFromParent });
    //remove the link from the iframe when update happen
    updateEvent({ srcInfo: "" });
  };

  const handleClickOpen = () => {
    updateEvent({ open: true });
  };

  const handleClose = () => {
    updateEvent({ open: false });
  };

  const handleSetValue = (data: any, type: string) => {
    switch (type) {
      case "html":
        updateEvent({ html: data });
        updateEvent({ srcInfo: "" });
        break;
      case "css":
        updateEvent({ css: data });
        updateEvent({ srcInfo: "" });
        break;
      case "js":
        updateEvent({ js: data });
        updateEvent({ srcInfo: "" });
        break;
    }
  };

  return (
    <div style={{ height: "100vh" }}>
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
              <Dialog open={event.open} onClose={handleClose}>
                <Modal
                  metaLinesFromParent={event.metaCdnLines}
                  cssLinesFromParent={event.cssCdnLines}
                  jsLinesFromParent={event.jsCdnLines}
                  onUpdateCdnLines={handleUpdateCdnLines}
                  onChange={(value: any) => updateEvent({ open: value })}
                />
              </Dialog>
            </Grid>
          </Grid>

          <Grid container sx={{ height: "auto" }}>
            <Grid item md={4} sm={12} xs={12}>
              <SandBoxEditor
                title="HTML"
                language="html"
                value={event.html}
                onChange={(value: any) => handleSetValue(value, "html")}
              />
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <SandBoxEditor
                title="CSS"
                language="css"
                value={event.css}
                onChange={(value: any) => handleSetValue(value, "css")}
              />
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <SandBoxEditor
                title="JS"
                language="javascript"
                value={event.js}
                onChange={(value: any) => handleSetValue(value, "js")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ height: "50vh" }}>
          <Grid item xs={12} md={12}>
            <div
              style={{
                paddingLeft: 12,
                paddingRight: 12,
                paddingBottom: 10,
                height: "100%",
              }}>
              {myFrame(event.srcInfo)}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default SandBox;
