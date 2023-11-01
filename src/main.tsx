import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkMode = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2c3440",
    },
    text: {
      primary: "#fff",
    },
    primary: {
      main: "#12727d",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#0c4f57",
          borderRadius: "50px",
        },
      },
      defaultProps: {
        InputLabelProps: {
          style: {
            color: "#fff", // Set the label color here
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#2c3440",
        },
      },
    },
  },
});

function Main() {
  const [mode, setMode] = useState("light");
  window.addEventListener(
    "NewDataEvent",
    () => {
      console.log("storage changed", localStorage.getItem("themeColor"));

      localStorage.getItem("themeColor") != "light"
        ? setMode("dark")
        : setMode("light");
    },
    false
  );

  const theme = () => {
    if (mode === "light") {
      return createTheme({
        palette: {
          mode,
        },
      });
    } else {
      return darkMode;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App themeColor={mode} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
