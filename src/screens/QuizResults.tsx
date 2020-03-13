import React, { useContext } from "react";
import Container from "../components/Container";
import { StackActions, useNavigation } from "@react-navigation/native";
import RouteNames from "../routes/RouteNames";
import { StyleSheet, View } from "react-native";
import OutlinedButton from "../components/OutlinedButton";
import { QuizContext } from "../context/QuizContext";
import { getQuestion } from "../graphql/Queries";
import ActivityIndicator from "../components/ActivityIndicator";
import { Query } from "react-apollo";
import { Results } from "../types";
const Leaderboard: any = require("react-native-leaderboard").default;
import { Avatar, AvatarIcon, Text } from "react-native-elements";
import Colors from "../theme/Colors";

type Highscore = {
  userName: string;
  highScore: number;
};

const QuizResults = (): JSX.Element => {
  const navigation = useNavigation();
  const { quiz, question } = useContext(QuizContext);

  const handleNextQuestionNavigation = (): void => {
    if (quiz?.questions!.length > 1) {
      navigation.dispatch(StackActions.replace(RouteNames.QuizQuestion));
    }
  };

  const handleMainMenuNavigation = (): void => {
    navigation.dispatch(StackActions.replace(RouteNames.QuizJoin));
  };

  const normalizeData = (results: Array<Results>): Array<Highscore> => {
    return results.map((result: Results) => {
      return {
        userName: result.player.name,
        highScore: result.totalScore
      } as Highscore;
    });
  };

  const questionsLeft = (): string => {
    if (quiz?.questions!.length > 1) {
      return `${quiz?.questions!.length} questions left`;
    }
    return `Quiz completed!`;
  };

  const avatarIcon: AvatarIcon = { name: "user", type: "simple-line-icon", color: Colors.Primary };

  return (
    <Container centered>
      <Query query={getQuestion(quiz?.id!, question?.id!)} pollInterval={500}>
        {({ loading, error, data }: any) => {
          if (loading || error) {
            return <ActivityIndicator />;
          }
          return (
            <View style={container.column}>
              <View style={avatar.container}>
                <Avatar icon={avatarIcon} size={"medium"} overlayContainerStyle={avatar.overlay} rounded={true} />
                <Text style={leaderboard.title}>{"Leaderboard"}</Text>
                <Text style={leaderboard.questionsLeft}>{questionsLeft()}</Text>
              </View>
              <Leaderboard
                data={normalizeData(data.getQuestion.results)}
                sortBy="highScore"
                labelBy="userName"
                oddRowColor={Colors.Background}
                evenRowColor={Colors.BackgroundSecondary}
                rankStyle={{ color: Colors.Primary }}
                labelStyle={{ color: Colors.Primary }}
                scoreStyle={{ color: Colors.Primary }}
              />
              {quiz?.questions!.length > 1 && (
                <OutlinedButton
                  title={!data.getQuestion.everybodyAnswered ? "Waiting on other players..." : "Next question"}
                  onPress={handleNextQuestionNavigation}
                  disabled={!data.getQuestion.everybodyAnswered}
                />
              )}
              {quiz?.questions!.length === 1 && (
                <OutlinedButton title={"Back to main menu"} onPress={handleMainMenuNavigation} />
              )}
            </View>
          );
        }}
      </Query>
    </Container>
  );
};

export default QuizResults;

const container = StyleSheet.create({
  column: { flexDirection: "column" }
});

const avatar = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: Colors.Background,
    alignItems: "center"
  },
  overlay: {
    backgroundColor: Colors.Background,
    borderWidth: 1,
    borderColor: Colors.Primary
  }
});

const leaderboard = StyleSheet.create({
  title: { fontSize: 30, color: Colors.Primary, paddingBottom: 10 },
  questionsLeft: { fontSize: 20, color: Colors.LightGrey, paddingBottom: 10 }
});
