import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../theme/Colors";
import { Button, ButtonProps } from "react-native-elements";

const OutlinedButton = (props: ButtonProps): JSX.Element => {
  return (
    <Button
      type={"outline"}
      containerStyle={buttonStyles.container}
      titleStyle={buttonStyles.title}
      buttonStyle={buttonStyles.border}
      {...props}
    />
  );
};

export default OutlinedButton;

const buttonStyles = StyleSheet.create({
  container: { width: "75%", alignSelf: "center", paddingBottom: 32 },
  border: {
    borderRadius: 8,
    borderColor: Colors.Primary
  },
  title: {
    color: Colors.Primary,
    fontWeight: "500"
  }
});
