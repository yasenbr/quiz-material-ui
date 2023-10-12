import "./input.css";
// import Login from "./components/Login";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "../src/redux/scoreReducer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Login from "./pages/Login";

const store = configureStore({
  reducer: {
    score: scoreReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
