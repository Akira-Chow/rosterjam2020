import React from "react";
import { createContext } from "react";
import { Question, Quiz } from "../types";

export interface IQuizContext {
  quiz?: Quiz;
  question?: Question;
  setCurrentQuiz: (currentQuiz: Quiz) => void;
  setCurrentQuestion: () => void;
}

export const QUIZ_DEFAULT_VALUE = {
  quiz: undefined,
  question: undefined,
  setCurrentQuiz: () => {},
  setCurrentQuestion: () => {}
};

export const QuizContext = createContext<IQuizContext>(QUIZ_DEFAULT_VALUE);
