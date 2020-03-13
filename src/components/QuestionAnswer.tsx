import React, { useContext } from "react";
import { Text } from "react-native-elements";
import { Answer } from "../types";
import Colors from "../theme/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Mutation } from "react-apollo";
import { answerQuestion } from "../graphql/Mutations";
import { PlayerContext } from "../context/PlayerContext";
import { StackActions, useNavigation } from "@react-navigation/native";
import RouteNames from "../routes/RouteNames";

type Props = {
  answer: Answer;
  quizId: string;
  questionId: string;
};

const navigationTimeout: number = 333;

const QuestionAnswer = (props: Props): JSX.Element => {
  const navigation = useNavigation();
  const { player } = useContext(PlayerContext);
  const start: Date = new Date();

  const {
    answer: { label, id },
    questionId,
    quizId
  } = props;

  const handleNavigation = (): void => {
    navigation.dispatch(StackActions.replace(RouteNames.QuizResults));
  };

  const handleTimeToAnswer = (): number => {
    const end: Date = new Date();
    return end.getTime() - start.getTime();
  };

  const handleButtonPress = (answerQuestion: any) => {
    return answerQuestion({
      variables: {
        quizId: quizId,
        answer: {
          questionId: questionId,
          answerId: id,
          playerId: player?.id,
          timeToAnswerInMs: handleTimeToAnswer()
        }
      }
    })
      .then((response: any) => {
        setTimeout(() => {
          handleNavigation();
        }, navigationTimeout);
      })
      .catch();
  };

  return (
    <Mutation mutation={answerQuestion}>
      {(answerQuestion: any) => {
        return (
          <TouchableOpacity style={answerButton.container} onPress={() => handleButtonPress(answerQuestion)}>
            <Text style={answerButton.label}>{label}</Text>
          </TouchableOpacity>
        );
      }}
    </Mutation>
  );
};

export default QuestionAnswer;

const answerButton = StyleSheet.create({
  container: {
    backgroundColor: Colors.BackgroundSecondary,
    paddingVertical: 32,
    paddingHorizontal: 32,
    borderRadius: 4,
    marginVertical: 8
  },
  label: {
    color: Colors.LightGrey,
    fontSize: 20
  }
});
