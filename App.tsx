import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { HomeScreen } from "./src/screens/HomeScreen";
import { Store, useSelector } from "./src/utils/redux/Store";
import { LoginScreen } from "./src/screens/LoginScreen";
import { default as Colors } from "./src/theme/Colors.json";
import { RegisterScreen } from "./src/screens/RegisterScreen";
import { checkPreviousSession } from "./src/utils/helpers/SessionHelper";
import { ErrorModalInjector } from "./src/components/ModalError";
import { SuccessModalInjector } from "./src/components/ModalSuccess";
import { DeepLinking } from "./src/components/DeepLinking";
import { ActivateScreen } from "./src/screens/ActivateScreen";
import { ActivationModalInjector } from "./src/components/ModalActivation";

const Stack = createStackNavigator();

function RootStack() {
  checkPreviousSession();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const activation = useSelector((state) => state.auth.activation);
  const error = useSelector((state) => state.globalError);
  const success = useSelector((state) => state.globalSuccess);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...Colors }}>
        {!!error.name && (
          <ErrorModalInjector title={error.name} message={error.message} />
        )}
        {!!success.name && (
          <SuccessModalInjector
            title={success.name}
            message={success.message}
          />
        )}
        {!!activation.isActivationRequired && (
          <ActivationModalInjector email={activation.email} />
        )}
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isAuthenticated ? "Home" : "Login"}
            headerMode="none"
          >
            {isAuthenticated && (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
              </>
            )}
            {!isAuthenticated && (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Activate" component={ActivateScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={Store}>
        <RootStack />
      </ReduxProvider>
    );
  }
}
