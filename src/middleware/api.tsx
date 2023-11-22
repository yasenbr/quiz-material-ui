import { useEffect, useState } from "react";
import { QuizQuestionType } from "../typings";

const API_URL = import.meta.env.VITE_QUESTIONS_API_URL;
console.log("env_2: ", API_URL);

function getQuestions() {
  const [questions, setQuestions] = useState<{
    Questions: QuizQuestionType[];
  }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL("/api/data", API_URL);
        const response = await fetch(url.href);
        const jsonData = await response.json();
        console.log("j:", jsonData);
        setQuestions(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_URL]); // Include API_URL in the dependency array

  return questions;
}

export { getQuestions };
