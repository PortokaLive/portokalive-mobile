import React from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  StatusBar,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { NodeCameraView } from "react-native-nodemediaclient";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { NodeMediaClient } from "react-native-nodemediaclient";

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ],
      {
        title: "Cool Photo App Camera And Microphone Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
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

class PushScreen extends React.Component {
  static navigationOptions = {
    title: "Push",
  };

  constructor(props) {
    super(props);
    this.state = { flashenable: false };
  }

  componentWillMount() {
    if (Platform.OS === "android") {
      requestCameraPermission();
      NodeMediaClient.setLicense(
        "ZjJhNTIzODAtNGU0ZDUzMjEtY24ubm9kZW1lZGlhLmlTaG93Uk4=-syY8+2t7utLZAKLDs1SaD0EOPC9ft3Zq2SncV7gvMg1vnuEGf6QYMDpiSWj0A7xLhbn62BJHJvi1sGLPKgRflHnT6ysuUfQM7W8fgMA75gbqSCMu4vVqssX+yWCeEIbb5uJ/WHYjSvjSOa0W69TwHB5OSxf0bgAMFo8oJjiSCG16CKRuCHeNQBF8KRh+PYuRDnd3pBmnvE8QyWMDpvtEJd1fSYrGLdwgeO8F4gBKoeXyk2/rpEHKDmm/MKAlHli0/mpz8ejlL6ifAw6rB0TqXfpUMuo6vXpx0bjV7G5wxnOMB5pubn91UWrpRoUhPjadOFiket1DmqPsZFiQGnv0iA=="
      );
    } else if (Platform.OS === "ios") {
      NodeMediaClient.setLicense(
        "ZjJhNTIzODAtNGU0ZDUzMjEtY24ubm9kZW1lZGlhLmlTaG93Uk4=-CQ2OZOwxN8PmjPnqCO5jINgwytHewwXJgZ4OhYL0Hnh6TDjQJDL/ebvCV34cuN/LPn42+vEbKxVAhqv492V3RmNu2aPKL6+AlYtPNf1eWkFLYa9Q/5GwU22s98fKA6YB5IMQyG30VptasVRctQeIee/lhmGClkvo9Ib+C8rLai6HHzWst/WpfWJeJs9OYgosNcuS+VmydGAy/CkUkT4G2ew80q239GRSJ7g7KREcwgiPrGqPNiDFqtG1T08JD9SXELerQqIp71qaPRMjCDSk26L0Tg22z4/EKcp713bZGs2AnE3ye3RbsLdMfNNUU0j0Qc/PQFNpczkilbHwMDoRaA=="
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#333" }}>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <NodeCameraView
          style={{ flex: 1 }}
          ref={(vb) => {
            this.vb = vb;
          }}
          outputUrl="rtmp://broadcast.api.video/s/4951c599-3eb8-4fc4-934f-393e329f6e77"
          camera={{ cameraId: 1, cameraFrontMirror: true }}
          audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
          video={{
            preset: 1,
            bitrate: 500000,
            profile: 1,
            fps: 15,
            videoFrontMirror: false,
          }}
          smoothSkinLevel={3}
          autopreview={true}
        />
        <ActionButton
          buttonColor="#1abc9c"
          offsetY={32}
          offsetX={16}
          size={32}
          hideShadow={true}
          verticalOrientation="down"
        >
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Reverse Camera"
            onPress={() => {
              this.vb.switchCamera();
              this.state.flashenable = false;
            }}
          >
            <Icon
              name="ios-reverse-camera-outline"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Switch Flashlight"
            onPress={() => {
              this.state.flashenable = !this.state.flashenable;
              this.vb.flashEnable(this.state.flashenable);
            }}
          >
            <Icon name="ios-bulb-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#e6ce28"
            title="Publish"
            onPress={() => {
              console.log("Publishing");
              this.vb.start();
            }}
          >
            <Icon
              name="ios-paper-plane-outline"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#e74c3c"
            title="Close"
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Icon name="ios-power-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
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
    color: "white",
  },
});

export default PushScreen;
