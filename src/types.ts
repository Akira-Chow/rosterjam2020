export type Player = {
  id: string;
  name: string;
};

export type Query = {
  getQuiz(id: string): Quiz;
};

export type Answer = {
  id: string;
  label: string;
};

export type Question = {
  id: string;
  label: string;
  answers: Array<Answer>;
};

export type Quiz = {
  id: string;
  players?: Array<Player>;
  questions?: Array<Question>;
};

export type Results = {
  player: Player;
  totalScore: number;
};
