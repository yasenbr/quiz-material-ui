import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

export default function VerticalTabs(props: any) {
  console.log("props", props);
  const initialCssLines = props.onClick.cssCdnLines;
  const initialJsLines = props.onClick.jsCdnLines;
  const [value, setValue] = useState(0);
  const [cssLines, setCssLines] = useState<string[]>(initialCssLines);
  const [jsLines, setJsLines] = useState<string[]>(initialJsLines);

  const whiteTextStyle = {
    color: "white",
  };

  const {
    cssLines: cssLinesFromParent,
    jsLines: jsLinesFromParent,
    onUpdateLines,
  } = props;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAddCssClick = () => {
    // Create a copy of the current CSS lines and add a new line
    const newCssLines = [...cssLines, ""];
    setCssLines(newCssLines);
  };

  const handleRemoveCssLine = (indexToRemove: any) => {
    // Create a new array without the line at the specified index
    const newCssLines = cssLines.filter((_, index) => index !== indexToRemove);
    setCssLines(newCssLines);
  };

  console.log("verification:", cssLines);

  const handleAddJsClick = () => {
    // Create a copy of the current js lines and add a new line
    const newJsLines = [...jsLines, ""];
    setJsLines(newJsLines);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "#3e4045",
        color: "#fff",
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
          textColor: "#fff",
        }}>
        <Tab label="HTML" {...a11yProps(0)} style={{ color: "#fff" }} />
        <Tab label="CSS" {...a11yProps(1)} style={{ color: "#fff" }} />
        <Tab label="JS" {...a11yProps(2)} style={{ color: "#fff" }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography>Add meta tag to be added in the header</Typography>
        <TextField
          autoFocus
          margin="dense"
          id="html"
          label="meta tag"
          type="text"
          fullWidth
          variant="standard"
          sx={{
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiInputBase-root .MuiInput-root::before": {
              borderBottomColor: "#fff",
            },
          }}
        />
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
              style={whiteTextStyle}
              autoFocus={index === cssLines.length - 1}
              margin="dense"
              id={`css-${index}`}
              label="cdn css link"
              type="text"
              fullWidth
              variant="standard"
              value={line || ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderBottomColor: "white",
                  },
                },
                input: { color: "white" },
                label: { color: "white" },
              }}
              onChange={(e) => {
                console.log("line", cssLines);
                // Update the value of the corresponding CSS line
                const newCssLines = [...cssLines];
                newCssLines[index] = e.target.value;
                setCssLines(newCssLines);
                onUpdateLines(newCssLines, jsLinesFromParent);
              }}
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
            sx={{ input: { color: "white" }, label: { color: "white" } }}
            onChange={(e) => {
              // Update the value of the corresponding js line
              const newJsLines = [...jsLines];
              newJsLines[index] = e.target.value;
              setJsLines(newJsLines);
              onUpdateLines(cssLinesFromParent, newJsLines);
            }}
          />
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
