import gql from "graphql-tag";

export const getQuiz = (quizId: string) => gql`
  query getQuiz {
    getQuiz(id: ${JSON.stringify(quizId)}) {
      id
      players {
        id
      }
      questions {
        id
        label
        answers {
          id
          label
        }
      }
    }
  }
`;

export const getQuestion = (quizId: string, questionId: string) => gql`
  query getQuestion {
    getQuestion(quizId: ${JSON.stringify(quizId)}, questionId: ${JSON.stringify(questionId)}) {
      everybodyAnswered
      results {
        player {
          name
        }
        totalScore
      }
    }
  }
`;
