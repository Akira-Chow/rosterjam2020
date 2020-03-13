import React from "react";
import { ActivityIndicator as RNAI } from "react-native";
import Colors from "../theme/Colors";

const ActivityIndicator = (): JSX.Element => {
  return <RNAI size="large" color={Colors.Primary} />;
};

export default ActivityIndicator;
