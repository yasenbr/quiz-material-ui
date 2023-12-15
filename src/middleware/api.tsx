const API_URL = import.meta.env.VITE_QUESTIONS_API_URL;

async function getQuestions(id: any) {
  console.log("id-api", id);

  try {
    const url = new URL("/api/question/" + id, API_URL);
    const response = await fetch(url.href);
    console.log("response", response);
    const jsonData = await response.json();
    console.log("Fetched data:", jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // const socket = new WebSocket("ws://localhost:5000"); // Adjust the WebSocket URL as needed

  // // Listen for messages from the server
  // socket.addEventListener("message", (event) => {
  //   const newData = JSON.parse(event.data);
  //   console.log("Received message from server:", newData);

  //   // Trigger a fetch again when a signal is received
  //   fetchData();
  // });

  // // Clean up the WebSocket connection when the component is unmounted
  // return () => {
  //   socket.close();
  // };
}

export { getQuestions };
