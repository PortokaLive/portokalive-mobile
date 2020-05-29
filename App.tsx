import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { HomeScreen } from "./src/screens/HomeScreen";
import { Store } from "./src/utils/redux/Store";
import { LoginScreen } from "./src/screens/LoginScreen";
import { default as Colors } from "./src/theme/Colors.json";

const Stack = createStackNavigator();

function RootStack() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ReduxProvider store={Store}>
        <ApplicationProvider {...eva} theme={{...eva.light,...Colors}}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" headerMode="none">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </ReduxProvider>
    </>
  );
}

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
