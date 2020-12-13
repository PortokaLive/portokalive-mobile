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
import { ErrorModalInjector } from "./src/components/ModalError";
import { SuccessModalInjector } from "./src/components/ModalSuccess";
import { DeepLinking } from "./src/components/DeepLinking";
import { ActivateScreen } from "./src/screens/ActivateScreen";
import { ActivationModalInjector } from "./src/components/ModalActivation";
import { LogoutScreen } from "./src/screens/LogoutScreen";

const Stack = createStackNavigator();

function RootStack() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const activation = useSelector((state) => state.auth.activation);
  const error = useSelector((state) => state.globalError);
  const success = useSelector((state) => state.globalSuccess);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkSession = async () => {
      try {
        await checkPreviousSession();
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const LogoutScreenWrapper = ({ ...props }) => {
    return <LogoutScreen {...props} loading={loading} />;
  };

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
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={
              loading ? "Logout" : isAuthenticated ? "Home" : "Login"
            }
            headerMode="none"
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Logout" component={LogoutScreenWrapper} />
            <Stack.Screen name="Activate" component={ActivateScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

export class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={Store}>
        <RootStack />
      </ReduxProvider>
    );
  }
}
