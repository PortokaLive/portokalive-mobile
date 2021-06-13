import { Layout, Spinner, Text, Icon, Button } from "@ui-kitten/components";
import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { NodeCameraView } from "react-native-nodemediaclient";
import { getLiveListWithID } from "../utils/redux/actions/ActionLive";
import { useSelector } from "../utils/redux/Store";
const { width, height } = Dimensions.get("window");

const LiveIcon = (props:any) => (
  <Icon {...props} name='play-circle' width={35} height={35} />
);

const StopLiveIcon = (props:any) => (
  <Icon {...props} name='stop-circle' width={35} height={35} />
);

export default (props: any) => {
  const vbRef = React.useRef<any>();
  const currentUser = useSelector((state) => state?.auth?.user ?? {});
  const userName = currentUser.email.split("@")?.[0];
  const [liveStatus,setLiveStatus] = React.useState<any>({});
  const [stop,setStop] = React.useState(false);

  const liveLists = useSelector((state) => state?.live?.liveList ?? {});
  const currentLive = liveLists.find((v: any) => v.name === userName);

  const handleStart = () => {
    setStop(false);

    setTimeout(async () => {
      if (!!vbRef.current) {
        vbRef.current.start();
      }

      const result = await getLiveListWithID(currentLive?.liveStreamId)
      setLiveStatus(result)
    },1000);
  };

  const handleStop = () => {
    if (!!vbRef.current) {
      vbRef.current.stop();
      setStop(true);
    }

    setTimeout(async () => {
      const result = await getLiveListWithID(currentLive?.liveStreamId)
      setLiveStatus(result)
    },1000);
  };

  React.useEffect(() => {
    const fetchStream = async () => {
    const result = await getLiveListWithID(currentLive?.liveStreamId)
    setLiveStatus(result)
    };

    fetchStream();
  },[])

  if (!currentLive?.streamKey) {
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
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 10
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      width: "100%",
      bottom: 0,
      padding: 10
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

  const isBroadcasting = liveStatus?.broadcasting;
  const outputUrl = `rtmp://broadcast.api.video/s/${currentLive?.streamKey}`;

  return (
    <Layout style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text status="danger" style={{fontWeight:"bold"}}>{isBroadcasting ? "LIVE" : "Offline" }</Text>
      </View>
      <NodeCameraView
        style={{ flex: 1, width, height: height - 100 }}
        ref={vbRef}
        outputUrl={stop ? "" : outputUrl}
        camera={config.cameraConfig}
        audio={config.audioConfig}
        video={config.videoConfig}
        autopreview={true}
        smoothSkinLevel={3}
      />
      <View style={styles.footer}>
        {
          !isBroadcasting ?
        <Button appearance='outline' accessoryLeft={LiveIcon} status="danger" onPress={handleStart} /> :
        <Button appearance='outline' accessoryLeft={StopLiveIcon} status="danger" onPress={handleStop} />
        }
      </View>
    </Layout>
  );
};
