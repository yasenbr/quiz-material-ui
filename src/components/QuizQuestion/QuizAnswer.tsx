import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { useDispatch } from "react-redux";
import { javascript } from "@codemirror/lang-javascript";
import { decrementScore, incrementScore } from "../../redux/scoreReducer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";
import { FormControl, Radio, RadioGroup } from "@mui/material";
import "./QuizAnswer.css"
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
  // Create a state variable to hold the selected value
  const [selectedValue, setSelectedValue] = useState("");

  function formatJSXCode(jsxString: string) {
    jsxString = jsxString.replace(/^"|"$/g, "");
    const lines = jsxString.split("\n");
    const trimmedLines = lines.map((line) => line.trim());
    const formattedCode = trimmedLines.join("\n  ");

    return (
      <CodeMirror
        value={formattedCode}
        height="100px"
        width="400px"
        style={{ backgroundColor: "#2c3440" }}
        extensions={[javascript({ jsx: true })]}
      />
    );
  }

  console.log("selectedTrueAnswer", selectedTrueAnswer);

  // Function to handle radio button change
  const handleRadioChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  console.log("selectedValue", selectedValue);

  function optionClicked(isCorrect: boolean, answerIndex: number) {
    // console.log("answerIndex", answerIndex);
    // console.log("isCorrect", isCorrect);

    const updatedAnswers = localAnswers.map((answer, index) => {
      if (index === answerIndex) {
        return { ...answer, isSelected: true };
      } else {
        return { ...answer, isSelected: false };
      }
    });

    setLocalAnswers(updatedAnswers);
    console.log("updatedAnswers", updatedAnswers);

    
    if (isCorrect) {
      if (localAnswers[answerIndex].isSelected) {
        return
      }else
      if (!localAnswers[answerIndex].isSelected) {
        dispatch(incrementScore(1));
      } else {
        dispatch(decrementScore(1));
      }
      setSelectedTrueAnswer(!localAnswers[answerIndex].isSelected);
    } else if (!isCorrect && selectedTrueAnswer) {
      dispatch(decrementScore(1));
      setSelectedTrueAnswer(false);
    }

  }

  return (
    <FormControl>
      <RadioGroup value={selectedValue} onChange={handleRadioChange}>
        {type === "Quiz"
          ? localAnswers?.map((answer: any, index: number) => (
              <FormControlLabel
                sx={{ color: "#d3d3d3" }}
                control={
                  <Radio
                    key={index}
                    value={answer.value}
                    sx={{ color: "#d3d3d3" }}
                    checked={answer.isSelected}
                    id={answer.id}
                    onClick={() => optionClicked(answer.isCorrect, index)}
                  />
                }
                label={answer.text}
              />
            ))
          : localAnswers?.map((answer: any, index: number) => (
              <FormControlLabel
                control={
                  <Radio
                    key={index}
                    value={answer.value}
                    sx={{ mb: 2, color: "#d3d3d3" }}
                    checked={answer.isSelected}
                    id={answer.id}
                    onClick={() => optionClicked(answer.isCorrect, index)}
                  />
                }
                label={
                  <Container
                    sx={{ mb: 2, border: 1, borderRadius: "10px", boxShadow: 2 }}
                    disableGutters={true}>
                    {formatJSXCode(answer.code)}
                  </Container>
                }
              />
            ))}
      </RadioGroup>
    </FormControl>
  );
}
