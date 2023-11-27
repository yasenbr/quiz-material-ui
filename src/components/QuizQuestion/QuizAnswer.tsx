import { useEffect, useReducer } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { useDispatch } from "react-redux";
import { javascript } from "@codemirror/lang-javascript";
import { decrementScore, incrementScore } from "../../redux/scoreReducer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";
import { FormControl, Radio, RadioGroup } from "@mui/material";
import "./QuizAnswer.css";

interface QuizAnswerProps {
  answers: any[];
  type: any;
}

export default function QuizAnswer({
  answers,
  type,
}: QuizAnswerProps) {
  const dispatch = useDispatch();
  console.log("initialAnswers", answers);
  // console.log("answer",answers);
  
  
  
  const [event, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      console.log("newEvent", newEvent);
      return newEvent;
    },
    { localAnswers: answers, selectedTrueAnswer: false , selectedValue: ""}
  );

  useEffect(() => {
    // Update localAnswers when answers prop changes
    updateEvent({ localAnswers: answers });
  }, [answers]);

  function formatJSXCode(jsxString: string) {
    console.log("jsxString", jsxString);
    jsxString = jsxString.replace(/^"|"$/g, "");
    const lines = jsxString.split("\n");
    const trimmedLines = lines.map((line) => line.trim());
    const formattedCode = trimmedLines.join("\n  ");

    return (
      <CodeMirror
        value={formattedCode}
        height="100px"
        width="400px"
        style={{ backgroundColor: "red" }}
        extensions={[javascript({ jsx: true })]}
      />
    );
  }

  console.log("selectedTrueAnswer", event.selectedTrueAnswer);

  // Function to handle radio button change
  const handleRadioChange = (event: any) => {
    updateEvent({selectedValue: event.target.value});
  };
  console.log("selectedValue", event.selectedValue);

  function optionClicked(isCorrect: boolean, answerIndex: number) {
    // update localAnswers to reflect which answer is selected
    const updatedAnswers = event.localAnswers.map(
      (answer: any, index: number) => {
        if (index === answerIndex) {
          return { ...answer, isSelected: true };
        } else {
          return { ...answer, isSelected: false };
        }
      }
    );
    updateEvent({ localAnswers: updatedAnswers });
// invoke dispatch to update score
    if (isCorrect) {
      if (event.localAnswers[answerIndex].isSelected) {
        return;
      } else if (!event.localAnswers[answerIndex].isSelected) {
        dispatch(incrementScore(1));
      } else {
        dispatch(decrementScore(1));
      }
      updateEvent({ selectedTrueAnswer: !event.localAnswers[answerIndex].isSelected});
    } else if (!isCorrect && event.selectedTrueAnswer) {
      dispatch(decrementScore(1));
      updateEvent({ selectedTrueAnswer: false});
    }
  }

  // console.log("event", event);

  return (
    <FormControl>
      <RadioGroup value={event.selectedValue} onChange={handleRadioChange}>
        {type === "Quiz"
          ? event.localAnswers?.map((answer: any, index: number) => (
              <FormControlLabel
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
          : event.localAnswers?.map((answer: any, index: number) => (
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
                    sx={{
                      mb: 2,
                      border: 1,
                      borderRadius: "10px",
                      boxShadow: 2,
                    }}
                    disableGutters={true}>
                    {formatJSXCode(answer?.code)}
                  </Container>
                }
              />
            ))}
      </RadioGroup>
    </FormControl>
  );
}
