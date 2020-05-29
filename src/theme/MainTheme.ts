import { ViewStyle, StyleProp, TextStyle } from "react-native";
import { default as Colors } from "./Colors.json";

const container: StyleProp<ViewStyle> = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const width_90: StyleProp<ViewStyle> = {
  width: "90%",
};

const textDanger: StyleProp<TextStyle> = {
  color: "red",
};

export const MainTheme = {
  container,

  //--Width--//
  width_90,
  //--Variant---//
  textDanger,
};
