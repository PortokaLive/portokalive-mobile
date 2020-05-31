import React, { useEffect } from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { logoutUser } from "../utils/redux/actions/ActionAuth";
import { useSelector } from "../utils/redux/Store";
import { clearActivation } from "../utils/redux/actions/ActionSuccess";
import { Linking } from "react-native";

export const HomeScreen = ({ navigation }: any) => {
  useEffect(() => {
    clearActivation();
  }, []);

  const user = useSelector((state) => state.auth.user);
  return (
    <Layout style={MainTheme.LayoutTheme.container}>
      <Text category="h1">HOME {user && user.email}</Text>
      <Button
        onPress={() => {
          logoutUser(navigation);
        }}
      >
        Logout
      </Button>
    </Layout>
  );
};
