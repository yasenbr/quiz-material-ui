import "./input.css";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "../src/redux/scoreReducer";
import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Login from "./pages/Login";
import Code from "./pages/Code";
import NavBar from "./components/NavBar";
import SandBox from "./pages/SandBox";
import Footer from "./components/Footer";

const store = configureStore({
  reducer: {
    score: scoreReducer,
  },
});
const isLoggedIn = true;

function App() {
  return (
    <>
      <div style={{ backgroundColor: "" , height:"100vh"}}>
        <Provider store={store}>
          <CssBaseline />
          {isLoggedIn ? (
            <>
              <NavBar />
              <Routes>
                <Route path="/" element={<Quiz />} />
                <Route path="/code" element={<Code />} />
                <Route path="/sandbox" element={<SandBox />} />
                <Route path="/result" element={<Result />} />
              </Routes>
              <Footer/>
            </>
          ) : (
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          )}
        </Provider>
      </div>
    </>
  );
}

export default App;
