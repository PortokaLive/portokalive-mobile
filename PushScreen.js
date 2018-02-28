import React from 'react';
import { Text, TextInput, View, Button, StatusBar, StyleSheet } from 'react-native';
import { NodeCameraView } from 'react-native-nodemediaclient';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class PushScreen extends React.Component {
  static navigationOptions = {
    title: 'Push',
  };

  constructor(props) {
    super(props);
    this.state = { 'flashenable': false };
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={{ flex: 1, backgroundColor: '#333' }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <NodeCameraView
          style={{ flex: 1 }}
          ref={(vb) => { this.vb = vb }}
          outputUrl={params.pushserver + params.stream}
          camera={{ cameraId: 1, cameraFrontMirror: true }}
          audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
          video={{ preset: 1, bitrate: 500000, profile: 1, fps: 15, videoFrontMirror: false }}
          smoothSkinLevel={3}
          autopreview={true}
        />
        <ActionButton
          buttonColor="#1abc9c"
          offsetY={24}
          offsetX={16}
          size={32}
          hideShadow={true}
          verticalOrientation='down'

        >
          <ActionButton.Item buttonColor='#9b59b6' title="Reverse Camera" onPress={() => {
            this.vb.switchCamera();
            this.state.flashenable = false;
          }}>
            <Icon name="ios-reverse-camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Switch Flashlight" onPress={() => {
            this.state.flashenable = !this.state.flashenable;
            this.vb.flashEnable(this.state.flashenable);
          }}>
            <Icon name="ios-bulb-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#e6ce28' title="Publish" onPress={() => { this.vb.start() }}>
            <Icon name="ios-paper-plane-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#e74c3c' title="Close" onPress={() => { this.props.navigation.goBack() }}>
            <Icon name="ios-power-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View >
    );
  }

  componentWillUnmount() {
    this.vb.stop();
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default PushScreen;
