import React, { useEffect } from "react";
import { Layout, Text } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { useSelector } from "../utils/redux/Store";

export const HomeScreen = ({ navigation }: any) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("Login");
    }
  }, [isAuthenticated, navigation]);

  return (
    <Layout style={MainTheme.LayoutTheme.container}>
      <Text category="h1">HOME</Text>
    </Layout>
  );
};
