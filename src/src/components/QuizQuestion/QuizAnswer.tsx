import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { useDispatch } from "react-redux";
import { javascript } from "@codemirror/lang-javascript";
import { styles } from "./Style";
import { decrementScore, incrementScore } from "../../redux/scoreReducer";

interface QuizAnswerProps {
  answers: any[];
  type: any;
}

export default function QuizAnswer({
  answers: initialAnswers,
  type,
}: QuizAnswerProps) {
  const dispatch = useDispatch();
  const [localAnswers, setLocalAnswers] = useState(initialAnswers);
  const [selectedTrueAnswer, setSelectedTrueAnswer] = useState(false);

  function formatJSXCode(jsxString: string) {
    jsxString = jsxString.replace(/^"|"$/g, "");
    const lines = jsxString.split("\n");
    const trimmedLines = lines.map((line) => line.trim());
    const formattedCode = trimmedLines.join("\n  ");

    return (
      <CodeMirror
        className="border border-gray-300 rounded-md"
        value={formattedCode}
        height="100px"
        width="400px"
        extensions={[javascript({ jsx: true })]}
      />
    );
  }

  console.log("selectedTrueAnswer", selectedTrueAnswer);

  function optionClicked(isCorrect: boolean, answerIndex: number) {
    const updatedAnswers = localAnswers.map((answer, index) => {
      if (index === answerIndex) {
        return { ...answer, isSelected: true };
      } else {
        return { ...answer, isSelected: false };
      }
    });

    setLocalAnswers(updatedAnswers);

    if (isCorrect && !localAnswers[answerIndex].isSelected) {
      dispatch(incrementScore(1));
      setSelectedTrueAnswer(true);
    } else if (isCorrect && localAnswers[answerIndex].isSelected) {
      dispatch(decrementScore(1));
      setSelectedTrueAnswer(false);
    } else if (!isCorrect && !localAnswers[answerIndex].isSelected) {
      if (selectedTrueAnswer === true) {
        dispatch(decrementScore(1));
        setSelectedTrueAnswer(false);
      }
      return;
    }
  }

  return (
    <div>
      {type === "Quiz"
        ? localAnswers?.map((answer: any, index: number) => (
            <div
              className="mb-4 flex items-center justify-between ml-6"
              key={answer.index}>
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className={styles.checkBox}
                  type="checkbox"
                  value=""
                  id={answer.id}
                  checked={answer.isSelected}
                  onClick={() => optionClicked(answer.isCorrect, index)}
                />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor={answer.index}>
                  {answer.text}
                </label>
              </div>
            </div>
          ))
        : localAnswers?.map((answer: any, index: number) => (
            <div
              className="mb-4 flex items-center justify-between ml-6"
              key={answer.index}>
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className={styles.checkBox}
                  type="checkbox"
                  value=""
                  id={answer.id}
                  checked={answer.isSelected}
                  onClick={() => optionClicked(answer.isCorrect, index)}
                />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor={answer.index}>
                  {formatJSXCode(answer.code)}
                </label>
              </div>
            </div>
          ))}
    </div>
  );
}
