import React from 'react';
import { Text, TextInput, View, Button, StatusBar, Platform, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlayScreen from './PlayScreen';
import PushScreen from './PushScreen';
import { NodeMediaClient } from 'react-native-nodemediaclient';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
      {
        title: "Cool Photo App Camera And Microphone Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      playserver: "rtmp://192.168.1.107/live/",
      pushserver: "rtmp://192.168.1.107/live/",
      stream: 'demo_' + (Math.floor(Math.random() * (999 - 100)) + 100),
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      requestCameraPermission()
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', padding: 24, backgroundColor: '#333' }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <Text style={{ color: '#fff', fontSize: 48, marginTop: 36, marginBottom: 36 }}>iShow</Text>
        <Text style={{ color: '#fff', fontSize: 18 }}>Please enter a stream name.</Text>
        <TextInput
          style={{ color: '#fff', height: 40, padding: 8 }}
          placeholder="Stream name must be 4 or more characters."
          placeholderTextColor='#555'
          value={this.state.stream}
          onChangeText={(stream) => this.setState({ stream })}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            onPress={() => this.props.navigation.navigate('Play', { 'playserver': this.state.playserver, 'stream': this.state.stream })}
            title="I Join"
          />
          <Button
            onPress={() => this.props.navigation.navigate('Push', { 'pushserver': this.state.pushserver, 'stream': this.state.stream })}
            title="I Show"
          />
        </View>

      </View>
    );
  }
}

const Stack = createStackNavigator();

function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="none"
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'iShow' }}
        />
        <Stack.Screen
          name="Play"
          component={PlayScreen}
        />
        <Stack.Screen
          name="Push"
          component={PushScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
