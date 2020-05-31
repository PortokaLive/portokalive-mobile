import React, { useEffect } from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { logoutUser } from "../utils/redux/actions/ActionAuth";
import { useSelector } from "../utils/redux/Store";

export const HomeScreen = ({ navigation }: any) => {
  const user = useSelector(state => state.auth.user);
  return (
    <Layout style={MainTheme.LayoutTheme.container}>
      <Text category="h1">HOME {user && user.email}</Text>
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
