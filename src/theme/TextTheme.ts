import { StyleProp, TextStyle } from "react-native";
import { ColorTheme } from "./ColorTheme";

const textBold: StyleProp<TextStyle> = {
  fontWeight: "bold",
};

const textPrimary: StyleProp<TextStyle> = {
  color: ColorTheme.Colors["color-primary-500"],
};

const textDanger: StyleProp<TextStyle> = {
  color: ColorTheme.Colors["color-danger-500"],
};

export const TextTheme = {
  textPrimary,
  textDanger,
  textBold
};
