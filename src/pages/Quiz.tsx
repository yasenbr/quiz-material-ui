import { useNavigate } from "react-router-dom";
import QuizQuestion from "../components/QuizQuestion/QuizQuestion";
import { Box, Container } from "@mui/material";
import Button from "@mui/material/Button";
import "./Quiz.css";
import { getQuestions } from "../middleware/api";
import { initialState } from "../redux/scoreReducer";
import { useDispatch } from "react-redux";

function Quiz() {
  const navigate = useNavigate();
  const data = getQuestions();
  const dispatch = useDispatch();

  dispatch(initialState(0));

  const handleResultClick = () => {
    // Navigate to the "Result" page and pass the length of Questions as a state parameter
    navigate("/Result", { state: { data } });
  };

  return (
    <>
      <div>
        <div>
          <Container maxWidth="sm">
            <Box sx={{ pt: "5rem", mb: "5rem" }}>
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
