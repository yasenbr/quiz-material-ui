import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { QuizQuestionType } from "../typings";
import { Box, Container } from "@mui/material";
import CodeEditor from "../components/QuizQuestion/CodeEditor";

function Code() {
  const [data, setData] = useState<{ Questions: QuizQuestionType[] }>();
  // const navigate = useNavigate();

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

  // const handleResultClick = () => {
  //   // Navigate to the "Result" page and pass the length of Questions as a state parameter
  //   navigate("/Result", { state: { data } });
  // };
  console.log("data-code", data?.Questions);

  return (
    <>
      <div style={{ height: "10vh"}}>
        <Container maxWidth="sm">
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
