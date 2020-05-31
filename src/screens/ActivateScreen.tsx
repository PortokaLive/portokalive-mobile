import React, { useEffect } from "react";
import { Layout, Spinner, Text } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { useSelector } from "../utils/redux/Store";
import { activateAccount } from "../utils/redux/actions/ActionAuth";

export const ActivateScreen = ({ route, navigation }: any) => {
  const { email, activationCode } = route.params;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.globalError);
  const success = useSelector((state) => state.globalSuccess);

  useEffect(() => {
    if (!email || !activationCode) {
      navigation.navigate("Login");
    } else {
      activateAccount(email, activationCode);
    }
  }, [email, activationCode, navigation]);

  useEffect(() => {
    if (error.name && error.message) {
      setTimeout(() => {
        navigation.navigate("Login");
      }, 1000);
    }
  }, [error]);

  return (
    <Layout style={MainTheme.LayoutTheme.container}>
      {!isAuthenticated ? (
        <Text>Your account is being activated.</Text>
      ) : (
        <Text>Your account is activated.</Text>
      )}
      {!isAuthenticated ? (
        <Text>Please wait...</Text>
      ) : (
        <Text>Logging in...</Text>
      )}
      <Layout style={{ marginTop: 20 }}>
        <Spinner size="large" />
      </Layout>
    </Layout>
  );
};
