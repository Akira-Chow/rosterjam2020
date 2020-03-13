import React, { useCallback, useState } from "react";
import { IQuizContext } from "../context/QuizContext";
import { Question, Quiz } from "../types";

export const useQuiz = (): IQuizContext => {
  const [quiz, setQuiz] = useState<Quiz | undefined>();
  const [question, setQuestion] = useState<Question | undefined>();

  const setCurrentQuiz = useCallback((currentQuiz: Quiz): void => {
    setQuiz(currentQuiz);
  }, []);

  const setCurrentQuestion = (): void => {
    const q: Question | undefined = quiz?.questions?.shift();
    setQuestion(q);
  };

  return {
    quiz,
    question,
    setCurrentQuiz,
    setCurrentQuestion
  };
};
