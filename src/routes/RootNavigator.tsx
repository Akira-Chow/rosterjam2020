import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RouteNames from "./RouteNames";
import JoinQuiz from "../screens/JoinQuiz";
import QuizQuestion from "../screens/QuizQuestion";
import LoadingQuiz from "../screens/LoadingQuiz";
import QuizResults from "../screens/QuizResults";

const Stack = createStackNavigator();

const QuizStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={RouteNames.QuizJoin} headerMode={"none"}>
      <Stack.Screen name={RouteNames.QuizJoin} component={JoinQuiz} />
      <Stack.Screen name={RouteNames.QuizLoading} component={LoadingQuiz} />
      <Stack.Screen name={RouteNames.QuizQuestion} component={QuizQuestion} />
      <Stack.Screen name={RouteNames.QuizResults} component={QuizResults} />
    </Stack.Navigator>
  );
};

export default QuizStack;
