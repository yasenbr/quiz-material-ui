import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { styles } from "./style";
import { initialState } from "../redux/scoreReducer";

function Result() {
    const dispatch = useDispatch();
  const score = useSelector((state: any) => state.score); // Get the score from Redux
  //   console.log("score", score);

  const location = useLocation();
  const data = location.state?.data;

  function ClearCache() {
    dispatch(initialState(0));
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center h-full px-6 py-24">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Quiz results
        </h1>
        <div>
          <p className="text-2xl font-bold">
            Your score is: {score} out of {data?.Questions.length -1}
          </p>
        </div>
        <div>
          <div className="w-full mt-10">
            <button type="button" className={styles.button}>
              <Link to="/" onClick={ClearCache}>
                Retake the quiz
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
