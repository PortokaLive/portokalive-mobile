import { StyleProp, ViewStyle } from "react-native";

const container: StyleProp<ViewStyle> = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const width_100: StyleProp<ViewStyle> = {
  width: "100%",
};

const width_90: StyleProp<ViewStyle> = {
  width: "90%",
};

const width_80: StyleProp<ViewStyle> = {
  width: "80%",
};

const width_70: StyleProp<ViewStyle> = {
  width: "60%",
};

const width_60: StyleProp<ViewStyle> = {
  width: "60%",
};

const width_50: StyleProp<ViewStyle> = {
  width: "50%",
};

export const LayoutTheme = {
  container,
  width_100,
  width_90,
  width_80,
  width_70,
  width_60,
  width_50
}