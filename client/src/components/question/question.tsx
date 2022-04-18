import React from "react";
import { Answer } from "../../common/types";

interface QuestionProps {
  question: string;
  changeAnswerHandler: (
    answer: Answer,
    question: string
  ) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  changeAnswerHandler,
}) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeAnswerHandler(e.target.value as Answer, question);
  };

  return (
    <div className="question__container">
      <p>{question}</p>
      <div className="radio__wrapper">
        <div className="radio__container">
          <input
            type="radio"
            name={question}
            id={`yes_${question}`}
            value="yes"
            onChange={changeHandler}
          />
          <label htmlFor={`yes_${question}`}>Yes</label>
        </div>
        <div className="radio__container">
          <input
            type="radio"
            name={question}
            id={`no_${question}`}
            value="no"
            onChange={changeHandler}
          />
          <label htmlFor={`no_${question}`}>No</label>
        </div>
      </div>
    </div>
  );
};

export default Question;
