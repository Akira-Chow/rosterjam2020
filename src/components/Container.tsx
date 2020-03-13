import React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import Colors from "../theme/Colors";

type Props = {
  style?: ViewStyle;
  centered?: boolean;
  children: Array<React.ReactNode> | React.ReactNode;
};

export const Container = (props: Props): JSX.Element => {
  return (
    <SafeAreaView style={[container.default, props.centered ? container.centered : {}, props.style]}>
      {props.children}
    </SafeAreaView>
  );
};

export default Container;

const container = StyleSheet.create({
  default: { flex: 1, backgroundColor: Colors.Background },
  centered: { flexDirection: "row", alignItems: "center", justifyContent: "center" }
});
