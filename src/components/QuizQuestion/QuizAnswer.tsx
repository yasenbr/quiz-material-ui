import { useEffect, useReducer, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { useDispatch } from "react-redux";
import { javascript } from "@codemirror/lang-javascript";
import { decrementScore, incrementScore } from "../../redux/scoreReducer";
import { updateEventData } from "../../redux/eventReducer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";
import { FormControl, Radio, RadioGroup } from "@mui/material";
import js_beautify from "js-beautify";
import "./QuizAnswer.css";

interface QuizAnswerProps {
  answers: Array<any>;
  type: any;
  number: number;
}

export default function QuizAnswer({ answers, type, number }: QuizAnswerProps) {
  const dispatch = useDispatch();

  function findKeywordIncludes(arr: any) {
    console.log("arr", arr);
    for (const item of arr.localAnswers) {
      if ("isSelected" in item) {
        console.log("isSelected", item.isSelected);
        dispatch(updateEventData(arr));
        // return true; // 'isSelected' is present in at least one object
      }
    }
    return false; // 'isSelected' is not present in any object
  }

  const [event, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      // console.log("newEvent", newEvent);
      findKeywordIncludes(newEvent);
      return newEvent;
    },
    { localAnswers: answers, selectedTrueAnswer: false, selectedValue: "", number: number }
  );

  useEffect(() => {
    // Update localAnswers when answers prop changes
    updateEvent({ localAnswers: answers });
  }, [answers]);

  function formatJSXCode(jsxString: string) {
    const formattedCode = js_beautify(jsxString, {
      indent_size: 2,
      space_in_empty_paren: true,
      jslint_happy: true,
    });

    return (
      <CodeMirror
        value={formattedCode}
        height="auto"
        width="600px"
        style={{ backgroundColor: "red" }}
        extensions={[javascript({ jsx: true })]}
      />
    );
  }

  // console.log("selectedTrueAnswer", event.selectedTrueAnswer);

  // Function to handle radio button change
  const handleRadioChange = (event: any) => {
    updateEvent({ selectedValue: event.target.value });
  };
  // console.log("selectedValue", event.selectedValue);

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
    console.log("event-1", event.localAnswers);

    // invoke dispatch to update score
    if (isCorrect) {
      if (event.localAnswers[answerIndex].isSelected) {
        // console.log("returning");
        return;
      } else if (!event.localAnswers[answerIndex].isSelected) {
        // console.log("incrementScore");
        dispatch(incrementScore(1));
      } else {
        // console.log("decrementScore");
        dispatch(decrementScore(1));
      }
      updateEvent({
        selectedTrueAnswer: !event.localAnswers[answerIndex].isSelected,
      });
    } else if (!isCorrect && event.selectedTrueAnswer) {
      // console.log("decrementScore-2");
      dispatch(decrementScore(1));
      updateEvent({ selectedTrueAnswer: false });
    }
  }

  // console.log("event-2", event.localAnswers);

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
