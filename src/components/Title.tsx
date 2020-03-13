import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import Colors from "../theme/Colors";

type Props = {
  value: string;
};

const Title = (props: Props): JSX.Element => {
  return (
    <View style={styles.containerStyle}>
      <Text h2 h2Style={styles.titleStyle}>
        {props.value}
      </Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  containerStyle: { width: "75%", alignSelf: "center", justifyContent: "center", flex: 1 },
  titleStyle: {
    color: Colors.Primary,
    textAlign: "center"
  }
});
