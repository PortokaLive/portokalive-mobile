import { Layout, Spinner, Text, Icon, Button } from "@ui-kitten/components";
import React from "react";
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Dimensions,
} from "react-native";
import { NodeMediaClient, NodeCameraView } from "react-native-nodemediaclient";
import { useSelector } from "../utils/redux/Store";

const { width, height } = Dimensions.get("window");

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
  } catch (err) {
    console.warn(err);
  }
};

export default (props: any) => {
  const vbRef = React.useRef<any>();
  const [ready, setReady] = React.useState(false);
  const currentUser = useSelector((state) => state?.auth?.user ?? {});
  const userName = currentUser.email.split("@")?.[0];

  const liveLists = useSelector((state) => state?.live?.liveList ?? {});
  const currentLive = liveLists.find((v: any) => v.name === userName);

  React.useEffect(() => {
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
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (!!vbRef.current) {
      vbRef.current.start();
    }
  }, []);

  if (!currentLive?.streamKey || !ready) {
    return (
      <>
        <Text>Preparing live stream...</Text>
        <Layout style={{ marginTop: 20 }}>
          <Spinner size="large" />
        </Layout>
      </>
    );
  }

  const styles = StyleSheet.create({
    header: {
      position: "absolute",
      top: 0,
    },
    footer: {
      position: "absolute",
      bottom: 0,
    },
  });

  const config = {
    cameraConfig: {
      cameraId: 1,
      cameraFrontMirror: false,
    },
    videoConfig: {
      preset: 4,
      bitrate: 2000000,
      profile: 2,
      fps: 30,
      videoFrontMirror: true,
    },
    audioConfig: {
      bitrate: 128000,
      profile: 1,
      samplerate: 44100,
    },
  };

  return (
    <Layout style={{ flex: 1 }}>
      <NodeCameraView
        style={{ flex: 1, width, height: height - 100 }}
        ref={vbRef}
        outputUrl={`rtmp://broadcast.api.video/s/${currentLive?.streamKey}`}
        camera={config.cameraConfig}
        audio={config.audioConfig}
        video={config.videoConfig}
        autopreview={true}
        smoothSkinLevel={3}
      />
    </Layout>
  );
};
