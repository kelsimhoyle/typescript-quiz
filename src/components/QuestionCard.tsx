import React from "react";

// types
import { AnswerObjectType } from "../App";

// styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type PropTypes = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObjectType | undefined;
    questionNo: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<PropTypes> = ({ question, answers, callback, userAnswer, questionNo, totalQuestions }) => (
    <Wrapper>
        <p className="number">
            Question: {questionNo} / {totalQuestions}
        </p>

        <p
            dangerouslySetInnerHTML={{
                __html: question
            }} />
        <div>
            {answers.map(answer => (
                <ButtonWrapper
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                >
                    <button disabled={!!userAnswer}
                        onClick={callback}
                        value={answer}
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: answer
                            }} />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

export default QuestionCard;