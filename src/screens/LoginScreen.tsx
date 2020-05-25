import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { MainTheme } from "../theme/MainTheme";

export const LoginScreen = () => {
  return (
    <Layout style={MainTheme.container}>
      <Text category="h1">Login</Text>
    </Layout>
  );
};