
import CodeEditor from "./CodeEditor";
import QuizAnswer from "./QuizAnswer";

function QuizQuestion(data: any) {

  
  return (
    <div>
      {data.data?.map((item: any, index: number) => (
        <div key={index}>
          <h3 className="mb-6">
            {item.number}.{item.question}
          </h3>
          {item.type === "WRcode" ? (
            <CodeEditor/>
          ) : (
            <QuizAnswer answers={item.answers} type={item.type} />
          )}
        </div>
      ))}
    </div>
  );
}

export default QuizQuestion;
