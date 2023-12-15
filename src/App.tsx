import React, { useEffect, useState } from "react";
import "./input.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "../src/redux/scoreReducer";
import { Navigate, Route, Routes } from "react-router-dom";
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
import { useAuth } from "./auth/AuthContext";
import { getQuestions } from "./middleware/api";
import store from "./redux/store";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

// const store = configureStore({
//   reducer: {
//     score: scoreReducer,
//   },
// });

type Track = {
  themeColor: any;
  mouseTrack: boolean;
};

function App({ themeColor, mouseTrack }: Track, props: Props) {
  const theme = useTheme();
  const { isLoggedIn, login, logout, user } = useAuth();


  const [data, setData] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchResult = await getQuestions(user);
        console.log("fetch", fetchResult);
        setData(fetchResult);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed
      }
    }

    fetchData();
  }, [user]);

  function ScrollTop(props: Props) {
    const { children, window } = props;
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
            {!isLoggedIn ? (
              <Routes>
                <Route path="/" element={<Login />} />
                {/* <Route path="*" element={<Navigate to="/login" />} /> */}
              </Routes>
            ) : (
              <div style={{ marginTop: "80px" }}>
                <Routes>
                  <Route path="/" element={<Quiz data={data} />} />
                  <Route path="/code" element={<Code data={data} />} />
                  <Route path="/sandbox" element={<SandBox />} />
                  <Route path="/result" element={<Result />} />
                </Routes>
                <Footer />
              </div>
            )}
          </ThemeProvider>
        </Provider>
        <ScrollTop {...props}>
          <Fab
            size="small"
            aria-label="scroll back to top"
            sx={{ marginBottom: "70px" }}>
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </div>
    </>
  );
}

export default App;
