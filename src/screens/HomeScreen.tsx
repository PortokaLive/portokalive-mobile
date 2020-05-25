import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { MainTheme } from "../theme/MainTheme";

export const HomeScreen = () => {
  return (
    <Layout style={MainTheme.container}>
      <Text category="h1">HOME</Text>
    </Layout>
  );
};