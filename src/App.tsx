import React from "react";
import { StatusBar } from "react-native";
import { initialWindowSafeAreaInsets, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import QuizStack from "./routes/RootNavigator";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { usePlayer } from "./hooks/useUser";
import { PlayerContext } from "./context/PlayerContext";
import { QuizContext } from "./context/QuizContext";
import { useQuiz } from "./hooks/useQuiz";

const SERVER_URL: string = "SERVER_URL_HERE";

const client: ApolloClient<unknown> = new ApolloClient({ uri: SERVER_URL });

const App = (): JSX.Element => {
  const player = usePlayer();
  const quiz = useQuiz();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ApolloProvider client={client}>
        <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
          <PlayerContext.Provider value={player}>
            <QuizContext.Provider value={quiz}>
              <NavigationContainer>
                <QuizStack />
              </NavigationContainer>
            </QuizContext.Provider>
          </PlayerContext.Provider>
        </SafeAreaProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
