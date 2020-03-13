import React, { useContext, useState } from "react";
import { Input } from "react-native-elements";
import Container from "../components/Container";
import { StyleSheet, View } from "react-native";
import Colors from "../theme/Colors";
import Title from "../components/Title";
import Icon from "react-native-vector-icons/FontAwesome";
import RouteNames from "../routes/RouteNames";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Mutation } from "react-apollo";
import { joinQuiz } from "../graphql/Mutations";
import { PlayerContext } from "../context/PlayerContext";
import { QuizContext } from "../context/QuizContext";
import OutlinedButton from "../components/OutlinedButton";

const JoinQuiz = (): JSX.Element => {
  const navigation = useNavigation();
  const [playerName, setPlayerName] = useState<string>();
  const [quizId, setQuizId] = useState<string>();
  const { setCurrentPlayer } = useContext(PlayerContext);
  const { setCurrentQuiz } = useContext(QuizContext);

  const handleQuizIdInput = (text: string): void => {
    setQuizId(text);
  };

  const handlePlayerNameInput = (text: string): void => {
    setPlayerName(text);
  };

  const handleNavigation = (): void => {
    navigation.dispatch(StackActions.replace(RouteNames.QuizLoading));
  };

  const handleButtonPress = (joinQuiz: any) => {
    joinQuiz({
      variables: {
        quizId: quizId,
        name: playerName
      }
    })
      .then((response: any) => {
        setCurrentPlayer(response.data.joinQuiz);
        setCurrentQuiz({ id: quizId! });
        handleNavigation();
      })
      .catch();
  };

  return (
    <Container>
      <Title value={"Quiz J.A.M."} />
      <View style={inputView.container}>
        <Input
          leftIcon={<Icon name="paper-plane-o" size={24} color={Colors.Primary} style={inputStyles.icon} />}
          label={"Quiz"}
          placeholder="Enter quiz id"
          onChangeText={handleQuizIdInput}
          underlineColorAndroid="transparent"
          containerStyle={inputStyles.container}
          inputStyle={inputStyles.input}
          labelStyle={inputStyles.label}
          placeholderTextColor={Colors.LightGrey}
        />
        <Input
          leftIcon={<Icon name="user-o" size={24} color={Colors.Primary} style={inputStyles.icon} />}
          label={"Name"}
          placeholder="Enter a name"
          onChangeText={handlePlayerNameInput}
          underlineColorAndroid="transparent"
          containerStyle={inputStyles.container}
          inputStyle={inputStyles.input}
          labelStyle={inputStyles.label}
          placeholderTextColor={Colors.LightGrey}
        />
        <Mutation mutation={joinQuiz}>
          {(joinQuiz: any) => {
            return (
              <OutlinedButton
                disabled={!playerName || !quizId}
                title={"Start quiz"}
                onPress={() => handleButtonPress(joinQuiz)}
              />
            );
          }}
        </Mutation>
      </View>
    </Container>
  );
};

export default JoinQuiz;

const inputView = StyleSheet.create({
  container: { flex: 2 }
});

const inputStyles = StyleSheet.create({
  container: { width: "75%", alignSelf: "center", paddingBottom: 32, paddingHorizontal: 0 },
  label: {
    color: Colors.Primary
  },
  input: {
    height: 50,
    color: Colors.Text
  },
  icon: { paddingRight: 10 }
});
