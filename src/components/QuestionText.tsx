import React, { useContext, useLayoutEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { Answer } from "../types";
import QuestionAnswer from "./QuestionAnswer";
import Colors from "../theme/Colors";
import { QuizContext } from "../context/QuizContext";

const QuestionText = (): JSX.Element => {
  const { quiz, question, setCurrentQuestion } = useContext(QuizContext);

  useLayoutEffect(() => {
    setCurrentQuestion();
  }, []);

  const renderQuestionAnswerOptions = (answers: Array<Answer>): JSX.Element => {
    return (
      <View style={{ flexDirection: "column" }}>
        {answers.map((answer: Answer) => {
          return <QuestionAnswer key={answer.id} answer={answer} questionId={question?.id!} quizId={quiz?.id!} />;
        })}
      </View>
    );
  };

  return (
    <View style={container.card}>
      <View style={container.marginVertical}>
        <Text h4 h4Style={text.h4Style}>
          {question?.label}
        </Text>
      </View>
      <ScrollView style={{ height: "100%" }}>
        {question?.answers && renderQuestionAnswerOptions(question?.answers)}
      </ScrollView>
    </View>
  );
};

export default QuestionText;

const container = StyleSheet.create({
  card: {
    width: "85%",
    alignSelf: "center",
    padding: 16,
    borderRadius: 16
  },
  marginVertical: {
    marginVertical: 16
  },
  grid: {
    alignItems: "center"
  }
});

const text = StyleSheet.create({
  h4Style: { color: Colors.Primary, fontWeight: "500", textAlign: "left" }
});
