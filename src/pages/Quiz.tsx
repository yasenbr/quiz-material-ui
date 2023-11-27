import { useNavigate } from "react-router-dom";
import QuizQuestion from "../components/QuizQuestion/QuizQuestion";
import { Box, Container } from "@mui/material";
import Button from "@mui/material/Button";
import "./Quiz.css";
import { useState, useEffect } from "react";
// import { getQuestions } from "../middleware/api";
import { initialState } from "../redux/scoreReducer";
import { useDispatch } from "react-redux";

function Quiz() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const data = getQuestions();
  const [data, setData] = useState([]);
  dispatch(initialState(0));

  const API_URL = import.meta.env.VITE_SERVER_SIGNAL_API_URL;
  console.log("API_URL", API_URL);
  

  useEffect(() => {
    const socket = new WebSocket(API_URL);
    console.log("socket", socket);
     // Adjust the WebSocket URL as needed

    // Listen for messages from the server
    socket.addEventListener("message", (event) => {
      const newData = JSON.parse(event.data);
      console.log("Received message from server:", newData);
      setData(newData);
    });
    console.log("data", data);
  }, []);

  const handleResultClick = () => {
    // Navigate to the "Result" page and pass the length of Questions as a state parameter
    navigate("/Result", { state: { data } });
  };

  return (
    <>
      <div>
        <div>
          <Container maxWidth="sm" id="back-to-top-anchor">
            <Box sx={{ pt: "5rem", mb: "5rem" }}>
              <h3 className="tq-title">Quiz Module</h3>
            </Box>
          </Container>
        </div>
        <div>
          <div>
            <form>
              <QuizQuestion data={data} />
              {/* <!-- Divider --> */}
              <Container maxWidth="md" sx={{ pb: 5, mt: 5 }}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleResultClick}
                >
                  Finish quiz
                </Button>
              </Container>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
