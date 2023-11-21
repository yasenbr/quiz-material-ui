import { useEffect, useState } from "react";
import { QuizQuestionType } from "../typings";

function getQuestions() {
  const [questions, setQuestions] = useState<{
    Questions: QuizQuestionType[];
  }>();

  useEffect(() => {
    fetch("question.json")
      .then((response) => response.json())
      .then((jsonData) => {
        console.log("j:", jsonData);
        setQuestions(jsonData); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 

  return questions; // 
}

export { getQuestions };
