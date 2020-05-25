import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { HomeScreen } from "./src/screens/HomeScreen";
import { Store } from "./src/utils/redux/Store";

const Stack = createStackNavigator();

function RootStack() {
  return (
    <ReduxProvider store={Store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </ReduxProvider>
  );
}

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
