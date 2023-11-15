import { Box, Container } from "@mui/material";
import CodeEditor from "../components/QuizQuestion/CodeEditor";
import { getQuestions } from "../middleware/api";

function Code() {
  const data = getQuestions();

  // const handleResultClick = () => {
  //   // Navigate to the "Result" page and pass the length of Questions as a state parameter
  //   navigate("/Result", { state: { data } });
  // };
  console.log("data-code", data?.Questions);

  return (
    <>
      <div style={{ height: "10vh"}}>
        <Container maxWidth="sm" id="back-to-top-anchor">
          <Box sx={{ pt: "3rem"}}>
            <h3 className="tq-title-code ">Code Test</h3>
          </Box>
        </Container>
      </div>
      <div
        style={{
          height: "80vh",
          paddingTop: "5rem"
        }}>
        <div>
          <form>
            <div>
              {data?.Questions.map((item: any) => (
                <div>
                  {item.type === "WRcode" ? (
                    <CodeEditor info={item.problem} />
                  ) : null}
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Code;
