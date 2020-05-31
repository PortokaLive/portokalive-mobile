import React, { useEffect } from "react";
import { Layout, Spinner, Text } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { useSelector } from "../utils/redux/Store";

export const LogoutScreen = ({ navigation }: any) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("Login");
    }
  });

  return (
    <Layout style={MainTheme.LayoutTheme.container}>
      <Text>Wait for it..</Text>
      <Layout style={{ marginTop: 20 }}>
        <Spinner size="large" />
      </Layout>
    </Layout>
  );
};
