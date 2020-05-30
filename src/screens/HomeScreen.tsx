import React from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { logoutUser } from "../utils/redux/actions/ActionAuth";

export const HomeScreen = ({ navigation }: any) => {
  return (
    <Layout style={MainTheme.LayoutTheme.container}>
      <Text category="h1">HOME</Text>
      <Button
        onPress={() => {
          logoutUser();
        }}
      >
        Logout
      </Button>
    </Layout>
  );
};
