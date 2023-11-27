import QuizAnswer from "./QuizAnswer";
import { Container, Typography } from "@mui/material";
function QuizQuestion(data: any) {
  const info = data?.data.Questions;
  console.log("info", info);
  
  return (
    <div>
      {info?.map((item: any, index: number) => (
        <div key={index}>
          {item.type === "WRcode" ? null : (
            <Container maxWidth="md">
              <div>
                <Typography variant="h6">
                  {item.number}.{item.question}
                </Typography>
              </div>
              <div>
                <Typography variant="h6" gutterBottom marginLeft={5} >
                  <QuizAnswer answers={item.answers} type={item.type}/>
                </Typography>
              </div>
            </Container>
          )}
        </div>
      ))}
    </div>
  );
}

export default QuizQuestion;
