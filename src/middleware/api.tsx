import { useEffect, useState } from "react";
import { QuizQuestionType } from "../typings";

const API_URL = import.meta.env.VITE_QUESTIONS_API_URL;

function getQuestions() {
  const [questions, setQuestions] = useState<{
    Questions: QuizQuestionType[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL("/api/data", API_URL);
        const response = await fetch(url.href);
        const jsonData = await response.json();
        console.log("Fetched data:", jsonData);
        setQuestions(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const socket = new WebSocket("ws://localhost:5000"); // Adjust the WebSocket URL as needed

    // Listen for messages from the server
    socket.addEventListener("message", (event) => {
      const newData = JSON.parse(event.data);
      console.log("Received message from server:", newData);

      // Trigger a fetch again when a signal is received
      fetchData();
    });

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      socket.close();
    };
  }, [API_URL]); // Include API_URL in the dependency array

  return questions;
}

export { getQuestions };
