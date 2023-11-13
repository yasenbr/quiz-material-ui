import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { SetStateAction, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface VerticalTabsProps {
  metaLines: string[];
  cssLines: string[];
  jsLines: string[];

  onClick: {
    metaCdnLines: string[];
    cssCdnLines: string[];
    jsCdnLines: string[];
  };

  onUpdateLines: (
    metaLines: string[],
    cssLines: string[],
    jsLines: string[]
  ) => void;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: "550px" }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(props: VerticalTabsProps) {
  console.log("props", props);
  const initialMetaLines = props.onClick.metaCdnLines;
  const initialCssLines = props.onClick.cssCdnLines;
  const initialJsLines = props.onClick.jsCdnLines;
  const [value, setValue] = useState(0);
  const [metaLines, setMetaLines] = useState<string[]>(initialMetaLines);
  const [cssLines, setCssLines] = useState<string[]>(initialCssLines);
  const [jsLines, setJsLines] = useState<string[]>(initialJsLines);
  // const [lines, setLines] = useState<string[]>([]);

  // const whiteTextStyle = {
  //   color: "white",
  // };

  const {onUpdateLines} = props;

  const handleUpdate = (
    e: { target: { value: any } },
    lineUpdate: any,
    index: number,
    type: string
  ) => {
    console.log("e.target.value", e.target.value);

    const newLinesUpdate = [...lineUpdate];
    newLinesUpdate[index] = e.target.value;
    switch (type) {
      case "meta":
        setMetaLines(newLinesUpdate);
        onUpdateLines(newLinesUpdate, cssLines, jsLines);
        break;
      case "css":
        setCssLines(newLinesUpdate);
        onUpdateLines(metaLines, newLinesUpdate, jsLines);
        break;
      case "js":
        setJsLines(newLinesUpdate);
        onUpdateLines(metaLines, cssLines, newLinesUpdate);
        break;
      default:
        break;
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleAddLine = (
    lines: string[],
    setLines: { (value: SetStateAction<string[]>): void; (arg0: any[]): void }
  ) => {
    const newLines = [...lines, ""];
    setLines(newLines);
  };

  const handleRemoveLine = (
    indexToRemove: any,
    lines: any[],
    setLines: { (value: SetStateAction<string[]>): void; (arg0: any): void }
  ) => {
    const newLines = lines.filter((_, index) => index !== indexToRemove);
    setLines(newLines);
  };
  const handleRemoveMetaLine = (indexToRemove: any) => {
    // Create a new array without the line at the specified index
    handleRemoveLine(indexToRemove, metaLines, setMetaLines);
  };
  const handleAddMetaClick = () => {
    // Create a copy of the current meta lines and add a new line
    handleAddLine(metaLines, setMetaLines);
  };
  const handleAddCssClick = () => {
    // Create a copy of the current CSS lines and add a new line
    handleAddLine(cssLines, setCssLines);
  };
  const handleRemoveCssLine = (indexToRemove: any) => {
    // Create a new array without the line at the specified index
    handleRemoveLine(indexToRemove, cssLines, setCssLines);
  };
  const handleRemoveJsLine = (indexToRemove: any) => {
    // Create a new array without the line at the specified index
    handleRemoveLine(indexToRemove, jsLines, setJsLines);
  };
  const handleAddJsClick = () => {
    // Create a copy of the current js lines and add a new line
    handleAddLine(jsLines, setJsLines);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        height: 224,
      }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          width: "25%",
        }}>
        <Tab label="HTML" {...a11yProps(0)} />
        <Tab label="CSS" {...a11yProps(1)} />
        <Tab label="JS" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography>Add meta tag to be added in the header</Typography>
        {metaLines.map((line, index) => (
          <div key={index} style={{ display: "flex" }}>
            <TextField
              autoFocus
              margin="dense"
              id="html"
              label="meta tag"
              type="text"
              value={line}
              fullWidth
              variant="standard"
              onChange={(e) => handleUpdate(e, metaLines, index, "meta")}
            />
            <HighlightOffIcon
              onClick={() => handleRemoveMetaLine(index)}
              sx={{ mt: "30px", ml: "10px" }}
            />
          </div>
        ))}
        <Box sx={{ display: "flex" }}>
          <AddCircleOutlineIcon
            sx={{ cursor: "pointer", mr: "1rem" }}
            onClick={handleAddMetaClick}
          />
          <Typography>add line</Typography>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>
          Add External Stylesheets/Pens. Any URLs added here will be added in
          order, and before the CSS in the editor. You can use the CSS from
          another Pen by using its URL and the proper URL extension.
        </Typography>
        {cssLines.map((line, index) => (
          <div key={index} style={{ display: "flex" }}>
            <TextField
              autoFocus={index === cssLines.length - 1}
              margin="dense"
              id={`css-${index}`}
              label="cdn css link"
              type="text"
              fullWidth
              variant="standard"
              value={line || ""}
              onChange={(e) => handleUpdate(e, cssLines, index, "css")}
            />
            <HighlightOffIcon
              onClick={() => handleRemoveCssLine(index)}
              sx={{ mt: "30px", ml: "10px" }}
            />
          </div>
        ))}

        <Box sx={{ display: "flex" }}>
          <AddCircleOutlineIcon
            sx={{ cursor: "pointer", mr: "1rem" }}
            onClick={handleAddCssClick}
          />
          <Typography>add line</Typography>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>
          Add External Scripts/Pens. Any URL's added here will be added in
          order, and run before the JavaScript in the editor. You can use the
          URL of any other Pen, and it will include the JavaScript from that
          Pen.
        </Typography>
        {jsLines.map((line, index) => (
          <div key={index} style={{ display: "flex" }}>
            <TextField
              key={index}
              autoFocus={index === jsLines.length - 1} // Autofocus on the last added line
              margin="dense"
              id={`js-${index}`}
              label="cdn js link"
              type="text"
              fullWidth
              variant="standard"
              value={line}
              onChange={(e) => handleUpdate(e, jsLines, index, "js")}
            />
            <HighlightOffIcon
              onClick={() => handleRemoveJsLine(index)}
              sx={{ mt: "30px", ml: "10px" }}
            />
          </div>
        ))}
        <Box sx={{ display: "flex" }}>
          <AddCircleOutlineIcon
            sx={{ cursor: "pointer", mr: "1rem" }}
            onClick={handleAddJsClick}
          />
          <Typography>add line</Typography>
        </Box>
      </TabPanel>
    </Box>
  );
}
