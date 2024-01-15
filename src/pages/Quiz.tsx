import { useNavigate } from "react-router-dom";
import QuizQuestion from "../components/QuizQuestion/QuizQuestion";
import { Box, Container } from "@mui/material";
import Button from "@mui/material/Button";
import "./Quiz.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

interface auth {
  data: any;
}

function Quiz({ data }: auth) {
  const { user } = useAuth();
  const [localAnswersArray, setLocalAnswersArray] = useState<any[]>([]);
  const eventState = useSelector((state: { event: any }) => state.event);
  const score = useSelector((state: { score: number }) => state.score);
  const navigate = useNavigate();
  const serverUrl = "http://localhost:5000";

  console.log("score", score);

  console.log("user", user);

  console.log("eventState", eventState);
  

  useEffect(() => {
    if (eventState.localAnswers.length !== 0) {
      console.log("eventState.localAnswers", eventState.localAnswers);
      setLocalAnswersArray((prevArray: any) => [
        ...prevArray,
        { answers: eventState.localAnswers, number: eventState.number },
      ]);
    }
  }, [eventState.localAnswers]);

  console.log("localAnswersArray", localAnswersArray);

  const handleResultClick = () => {
    const jsonData = JSON.stringify({ localAnswersArray });
    console.log("jsonData", jsonData);
    fetch(serverUrl + "/api/question/" + user, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then(
        (
          /** @type {{ ok: any; status: any; json: () => any; }} */ response
        ) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        }
      )
      .then((/** @type {any} */ data) => {
        console.log("JSON data sent successfully - PUT request:", data);
      })
      .catch((/** @type {any} */ error) => {
        console.error("Error sending JSON data:", error);
      });
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
                  onClick={handleResultClick}>
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
