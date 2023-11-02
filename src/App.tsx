import "./input.css";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "../src/redux/scoreReducer";
import { Route, Routes } from "react-router-dom";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Login from "./pages/Login";
import Code from "./pages/Code";
import NavBar from "./components/NavBar";
import SandBox from "./pages/SandBox";
import Footer from "./components/Footer";
import { useState } from "react";

const store = configureStore({
  reducer: {
    score: scoreReducer,
  },
});
type Props = {
  themeColor: any;
  mouseTrack: boolean;
};

function App({themeColor, mouseTrack}: Props) {
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (localStorage.getItem("login") === "false") {
    setIsLoggedIn(false);
    localStorage.clear();
  }
  // console.log(isLoggedIn);
  console.log("theme->", themeColor);
  // console.log("mouseTrack->;", mouseTrack);

  return (
    <>
      <div style={{ backgroundColor: "", height: "100vh" }}>
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
                <Routes>
                  <Route path="/" element={<Quiz />} />
                  <Route path="/code" element={<Code />} />
                  <Route path="/sandbox" element={<SandBox />} />
                  <Route path="/result" element={<Result />} />
                </Routes>
                <Footer />
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
      </div>
    </>
  );
}

export default App;
