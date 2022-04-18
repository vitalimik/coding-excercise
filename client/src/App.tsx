import React, { useEffect, useState } from "react";
import { Answer, Question } from "./common/types";
import QuestionBlock from "./components/question/question";
import { QUESTIONS, YES_ANSWER_WEIGHT } from "./constants";
import { ScoreService } from "./service/scoreService";

const App = () => {
  const [answeredQuestions, setAnsweredQuestions] = useState<Question>({});
  const [score, setScore] = useState<number>();
  const [avgScore, setAvgScore] = useState<number>();
  const allAnswered =
    QUESTIONS.length === Object.keys(answeredQuestions).length;

  const getInitAvgScoreHandler = async () => {
    const data = await ScoreService.getInitAvgScore();
    setAvgScore(data);
  };

  const getResult = async () => {
    const keys = Object.keys(answeredQuestions);
    const yesAnswers = keys.reduce(
      (acc, key) => (answeredQuestions[key] === "yes" ? ++acc : acc),
      0
    );
    const newScore = (YES_ANSWER_WEIGHT * yesAnswers) / keys.length;
    setScore(newScore);
    const data = await ScoreService.getAvgScore(newScore);
    setAvgScore(data);
  };

  useEffect(() => {
    getInitAvgScoreHandler();
  }, []);

  const changeAnswerHandler = (answer: Answer, question: string) => {
    setAnsweredQuestions((prev) => ({
      ...prev,
      [question]: answer,
    }));
  };

  return (
    <div className="main__wrap">
      <main className="container">
        <div className="questions__container">
          {QUESTIONS.map((question) => {
            return (
              <QuestionBlock
                key={question}
                question={question}
                changeAnswerHandler={changeAnswerHandler}
              />
            );
          })}
        </div>
        <div className="result__container">
          <button onClick={getResult} disabled={!allAnswered}>
            Result
          </button>
          <div>Current score: {score}</div>
          <div>Average score: {avgScore}</div>
        </div>
      </main>
    </div>
  );
};

export default App;
