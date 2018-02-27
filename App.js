import React from 'react';
import { Text, TextInput, View, Button, StatusBar } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import PlayScreen from './PlayScreen';
import PushScreen from './PushScreen';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  constructor(props) {
    super(props);
    this.state = {
      playserver: 'rtmp://alplay.nodemedia.cn/ishow/',
      pushserver: 'rtmp://alpush.nodemedia.cn/ishow/',
      stream: '' + (Math.floor(Math.random() * (9999 - 1000)) + 1000),
    };
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', padding: 24, backgroundColor: '#333' }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <Text style={{ color: '#fff', fontSize: 48, marginBottom: 36 }}>iShow</Text>
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


const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Play: {
      screen: PlayScreen,
    },
    Push: {
      screen: PushScreen,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
