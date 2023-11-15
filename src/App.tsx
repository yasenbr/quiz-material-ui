import "./input.css";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "../src/redux/scoreReducer";
import { Route, Routes } from "react-router-dom";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";

import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Login from "./pages/Login";
import Code from "./pages/Code";
import NavBar from "./components/NavBar";
import SandBox from "./pages/SandBox";
import Footer from "./components/Footer";
import { useState } from "react";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

const store = configureStore({
  reducer: {
    score: scoreReducer,
  },
});
type Track = {
  themeColor: any;
  mouseTrack: boolean;
  
};


function App({ themeColor, mouseTrack }: Track, props: Props) {
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (localStorage.getItem("login") === "false") {
    setIsLoggedIn(false);
    localStorage.clear();
  }

  function ScrollTop(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const anchor = (
        (event.target as HTMLDivElement).ownerDocument || document
      ).querySelector("#back-to-top-anchor");

      if (anchor) {
        console.log("anchor->", anchor);
        
        anchor.scrollIntoView({
          block: "center",
        });
      }
    };

    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: "fixed", bottom: 16, right: 16 }}>
          {children}
        </Box>
      </Fade>
    );
  }
  // console.log(isLoggedIn);
  console.log("theme->", themeColor);
  // console.log("mouseTrack->;", mouseTrack);

  return (
    <>
      <div>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar
              login={isLoggedIn}
              themeColor={themeColor}
              mouseTrack={mouseTrack}
            />
            {isLoggedIn ? (
              <>
                <div style={{ marginTop: "80px" }}>
                  <Routes>
                    <Route path="/" element={<Quiz />} />
                    <Route path="/code" element={<Code />} />
                    <Route path="/sandbox" element={<SandBox />} />
                    <Route path="/result" element={<Result />} />
                  </Routes>
                  <Footer />
                </div>
              </>
            ) : (
              <>
                <Routes>
                  <Route path="/login" element={<Login />} />
                </Routes>
              </>
            )}
          </ThemeProvider>
        </Provider>
        <ScrollTop {...props}>
          <Fab size="small" aria-label="scroll back to top" sx={{marginBottom:"70px"}}>
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </div>
    </>
  );
}

export default App;
