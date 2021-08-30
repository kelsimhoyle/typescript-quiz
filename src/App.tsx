import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";

// Components
import QuestionCard from "./components/QuestionCard";

// Types
import { QuestionStateType, DifficultyEnum } from "./API";

// Styles
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObjectType = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [difficulty, setDifficulty] = useState<DifficultyEnum>(DifficultyEnum.EASY);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionStateType[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObjectType[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const chooseDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.currentTarget.value as DifficultyEnum);
  }

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      difficulty
    );
    // add error handling

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore(prev => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }

      setUserAnswers([...userAnswers, answerObject])
    }

  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Random Trivia!</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <>
            <label>
              <span>Choose your difficulty: </span>
              <select
                name="difficulty"
                value={difficulty}
                onChange={chooseDifficulty}
              >
                <option value={DifficultyEnum.EASY}>
                  Easy
                </option>
                <option value={DifficultyEnum.MEDIUM}>
                  Medium
                </option>
                <option value={DifficultyEnum.HARD}>
                  Hard
                </option>
              </select>
            </label>
            <button
              className="start"
              onClick={startTrivia}
            >
              Start Quiz
            </button>
          </>
        ) : null}

        {!gameOver ? <p className="score">Score: {score}</p>
          : null}
        {loading && <p className="">
          Loading Questions...
        </p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNo={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button
            className="next"
            onClick={nextQuestion}
          >
            Next
          </button>
        ) : null}

      </Wrapper>
    </>
  );
}

export default App;
