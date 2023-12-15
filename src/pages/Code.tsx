import { Box, Container } from "@mui/material";
import CodeEditor from "../components/QuizQuestion/CodeEditor";

function Code(data: any) {
//  const [data, setData] = useState<any>();

// useEffect(() => {
//   async function fetchData() {
//     try {
//       const fetchResult = await getQuestions(login);
//       console.log("fetch", fetchResult);
//       setData(fetchResult);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle the error as needed
//     }
//   }

//   fetchData();
// }, [login]);
  console.log("data-code", data);

  return (
    <>
      <div style={{ height: "10vh" }}>
        <Container maxWidth="sm" id="back-to-top-anchor">
          <Box sx={{ pt: "3rem" }}>
            <h3 className="tq-title-code ">Code Test</h3>
          </Box>
        </Container>
      </div>
      <div
        style={{
          height: "80vh",
          paddingTop: "5rem",
        }}>
        <div>
          <form>
            <div>
              {data?.data.questions.map((item: any) => (
                <div>
                  {item.type === "WRcode" ? (
                    <CodeEditor info={item.answers} />
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
