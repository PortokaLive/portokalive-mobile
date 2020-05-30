import { StyleProp, TextStyle } from "react-native";
import { default as Colors } from "./Colors.json";

const textBold: StyleProp<TextStyle> = {
  fontWeight: "bold",
};

const textPrimary: StyleProp<TextStyle> = {
  color: Colors["color-primary-500"],
};

const textDanger: StyleProp<TextStyle> = {
  color: Colors["color-danger-500"],
};

export const TextTheme = {
  textPrimary,
  textDanger,
  textBold
};
