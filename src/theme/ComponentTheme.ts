import { StyleProp, ViewStyle } from "react-native";
import { ColorTheme } from "./ColorTheme";

const backgroundPrimary: StyleProp<ViewStyle> = {
  backgroundColor: ColorTheme.Colors["color-primary-500"],
};

const backgroundDanger: StyleProp<ViewStyle> = {
  backgroundColor: ColorTheme.Colors["color-danger-500"],
};

const backgroundSuccess: StyleProp<ViewStyle> = {
  backgroundColor: ColorTheme.Colors["color-success-500"],
};

export const ComponentTheme = {
  backgroundPrimary,
  backgroundDanger,
  backgroundSuccess,
};
