import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { initialState } from "../redux/scoreReducer";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import "./Result.css";

function Result() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const score = useSelector((state: { score: number }) => state.score); // Get the score from Redux
  console.log("score", score);

  const location = useLocation();
  const data = location.state?.data;

  function ClearCache() {
    dispatch(initialState(0));
    navigate("/Code");
  }

  return (
    <div
      style={{ height: "auto", minHeight: "84vh", paddingBottom: "18.5rem" }}>
      <Container maxWidth="sm">
        <Box sx={{ pt: "5rem", mb: "6rem" }}>
          <h3 className="tq-title-result">Result</h3>
        </Box>
      </Container>
      <Container maxWidth="sm" style={{ marginBottom: "150px" }}>
        <Typography
          variant="h6"
          align="center"
          margin="marginTop={4}"
          gutterBottom>
          Your score is: {score} out of {data?.questions.length - 1}
        </Typography>
        <Box textAlign="center">
          <Button
            type="button"
            variant="contained"
            sx={{ backgroundColor: "#2c3440" }}>
            <Link onClick={ClearCache} color="#fff" component="button">
              To Code Test
            </Link>
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default Result;
