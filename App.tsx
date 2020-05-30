import React from "react";
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
import { ErrorModalInjector } from "./src/components/ErrorModalInjector";

const Stack = createStackNavigator();

function RootStack() {
  checkPreviousSession();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isError = useSelector((state) => state.globalError);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...Colors }}>
        <ErrorModalInjector visible={isError.name && isError.message} title={isError.name} message={isError.message} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isAuthenticated ? "Home" : "Login"}
            headerMode="none"
          >
            {isAuthenticated && (
              <Stack.Screen name="Home" component={HomeScreen} />
            )}
            {!isAuthenticated && (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
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
