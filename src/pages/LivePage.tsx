import { Layout, Spinner, Text, Icon, Button } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet } from "react-native";
import { NodeMediaClient, NodeCameraView } from "react-native-nodemediaclient";
import { createLiveStream } from "../utils/redux/actions/ActionLive";
import { useSelector } from "../utils/redux/Store";

export default (props: any) => {
  const vbRef = React.useRef();
  const [isCreated, setCreated] = React.useState(false);
  const currentUser = useSelector((state) => state?.auth?.user ?? {});
  const currentLive = useSelector((state) => state?.live?.currentLive ?? {});

  React.useEffect(() => {
    const init = async () => {
      try {
        createLiveStream(
          currentUser?.email?.split("@")?.[0] ?? currentUser?.id
        );
      } catch (ex) {
        console.error(ex);
        props.navigate(0);
      } finally {
        setCreated(true);
      }
    };
    if (!isCreated) {
      init();
    }
  }, [isCreated]);

  if (!isCreated || !currentLive?.streamKey) {
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

  const CloseIcon = () => <Icon name="close-outline" />;

  const NodeCameraHeader = () => (
    <View style={styles.header}>
      <Button appearance="ghost" accessoryLeft={CloseIcon} />
    </View>
  );

  const NodeCameraFooter = () => <View style={styles.footer}></View>;

  return (
    <Layout style={{ flex: 1 }}>
      <NodeCameraHeader />
      <NodeCameraView
        style={{ flex: 1 }}
        ref={vbRef}
        outputUrl={`rtmp://broadcast.api.video/s/${currentLive?.streamKey}`}
        camera={{ cameraId: 1, cameraFrontMirror: true }}
        audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
        video={{
          preset: 1,
          bitrate: 500000,
          profile: 1,
          fps: 15,
          videoFrontMirror: true,
        }}
        smoothSkinLevel={3}
        autopreview={true}
      />
      <NodeCameraFooter />
    </Layout>
  );
};
