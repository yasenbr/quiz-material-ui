import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizQuestion from "../components/QuizQuestion/QuizQuestion";
import { QuizQuestionType } from "../typings";
import { styles } from "./style";

function Quiz() {
  const [data, setData] = useState<{ Questions: QuizQuestionType[] }>();
  const navigate = useNavigate();

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

  const handleResultClick = () => {
    // Navigate to the "Result" page and pass the length of Questions as a state parameter
    navigate("/Result", { state: { data } });
  };

  return (
    <div className="flex flex-col">
      <section className="h-screen">
        <div className=" h-full px-6 py-24">
          <div className="flex flex-col justify-center items-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Quiz Module
            </h1>
          </div>
          <div className="g-6 flex h-full flex-wrap items-center justify-center ">
            <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
              <form className="mb-28">
                <QuizQuestion data={data?.Questions} />
                {/* <!-- Divider --> */}
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                    End 
                  </p>
                </div>
                <div className="w-full mt-10">
                  <button
                    type="button"
                    className={styles.button}
                    onClick={handleResultClick}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Quiz;
