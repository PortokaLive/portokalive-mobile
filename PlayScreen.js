import React from 'react';
import { Text, TextInput, View, Button, StatusBar } from 'react-native';
import { NodePlayerView } from 'react-native-nodemediaclient';
import ActionButton from 'react-native-action-button';

class PlayScreen extends React.Component {
  static navigationOptions = {
    title: 'Play',
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <NodePlayerView
          style={{ flex: 1, backgroundColor: '#333' }}
          ref={(vp) => { this.vp = vp }}
          inputUrl={params.playserver + params.stream}
          scaleMode={"ScaleAspectFill"}
          bufferTime={300}
          maxBufferTime={1000}
          autoplay={true}
        />

        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          // position='left'
          offsetY={24}
          offsetX={16}
          size={32}
          hideShadow={true}
          buttonText='x'
          verticalOrientation='down'
          onPress={() => { this.props.navigation.goBack() }}
        />
      </View>
    );
  }

  componentWillUnmount() {
    this.vp.stop();
  }
}

export default PlayScreen;
