import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizQuestion from "../components/QuizQuestion/QuizQuestion";
import { QuizQuestionType } from "../typings";
import { Box, Container } from "@mui/material";
import Button from "@mui/material/Button";
import "./Quiz.css";

function Quiz() {
  const [data, setData] = useState<{ Questions: QuizQuestionType[] }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("question.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleResultClick = () => {
    // Navigate to the "Result" page and pass the length of Questions as a state parameter
    navigate("/Result", { state: { data } });
  };

  return (
    <>
      <div>
        <div>
          <Container maxWidth="sm">
            <Box sx={{ pt: "5rem", mb: "5rem"}}>
              <h3 className="tq-title">Quiz Module</h3>
            </Box>
          </Container>
        </div>
        <div>
          <div>
            <form>
              <QuizQuestion data={data?.Questions} />
              {/* <!-- Divider --> */}
              <Container maxWidth="md" sx={{ pb: 5, mt: 5 }}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleResultClick}
                  sx={{ backgroundColor: "#2c3440" }}>
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
