import { ViewStyle, StyleProp } from "react-native";

const container: StyleProp<ViewStyle> = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const cardContainer: StyleProp<ViewStyle> = {
  width: "100%",
  padding: 0,
};

const paddingBox: StyleProp<ViewStyle> = {
  padding: 8,
};

export const MainTheme = {
  container,
  cardContainer,
  paddingBox,
};
