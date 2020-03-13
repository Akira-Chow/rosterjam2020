import React, { useContext, useEffect } from "react";
import Container from "../components/Container";
import { StyleSheet } from "react-native";
import Colors from "../theme/Colors";
import { Text } from "react-native-elements";
import ActivityIndicator from "../components/ActivityIndicator";
import { PlayerContext } from "../context/PlayerContext";
import { StackActions, useNavigation } from "@react-navigation/native";
import RouteNames from "../routes/RouteNames";
import { getQuiz } from "../graphql/Queries";
import { Query } from "react-apollo";
import { QuizContext } from "../context/QuizContext";

const loadingTime: number = 1000;

const LoadingQuiz = (): JSX.Element => {
  const navigation = useNavigation();
  const { player } = useContext(PlayerContext);
  const { quiz, setCurrentQuiz } = useContext(QuizContext);

  const handleNavigation = (): void => {
    navigation.dispatch(StackActions.replace(RouteNames.QuizQuestion));
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    timeout = setTimeout(() => handleNavigation(), loadingTime);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <Container centered={true} style={container.column}>
      <Query query={getQuiz(quiz?.id!)}>
        {({ loading, error, data }: any) => {
          if (loading || error) {
            return <ActivityIndicator />;
          }
          setCurrentQuiz(data.getQuiz);
          return (
            <>
              <Text style={loadingText.text}>{`${player?.name} has joined`}</Text>
              <Text style={loadingText.text}>{"Quiz engine is starting up..."}</Text>
              <ActivityIndicator />
            </>
          );
        }}
      </Query>
    </Container>
  );
};

export default LoadingQuiz;

const container = StyleSheet.create({
  column: { flexDirection: "column" }
});

const loadingText = StyleSheet.create({
  text: { color: Colors.Primary, paddingVertical: 32 }
});
