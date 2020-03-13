import gql from "graphql-tag";

export const joinQuiz = gql`
  mutation joinQuiz($quizId: ID!, $name: String!) {
    joinQuiz(quizId: $quizId, name: $name) {
      id
      name
    }
  }
`;

export const answerQuestion = gql`
  mutation answerQuestion($quizId: ID!, $answer: PlayerAnswerInput) {
    answerQuestion(quizId: $quizId, answer: $answer) {
      score
    }
  }
`;
