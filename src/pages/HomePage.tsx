import React from "react";
import { Image } from "react-native";
import { useSelector } from "../utils/redux/Store";
import { getLiveLists } from "../utils/redux/actions/ActionLive";
import { Layout, Text } from "@ui-kitten/components";
import { MainTheme } from "../theme";

export default () => {
  const [isLoading, setLoading] = React.useState(false);
  const liveStreams = useSelector((state) => state?.live?.liveList ?? []);

  React.useEffect(() => {
    setLoading(true);
    getLiveLists()
      .catch((ex) => {
        console.error(ex);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <Layout style={MainTheme.LayoutTheme.container}>
      {isLoading ? (
        <>
          <Image
            style={{ width: 300, height: 300 }}
            source={require("../assets/live_loading.png")}
          />
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Hmm...Who's on live now?
          </Text>
        </>
      ) : (
        <></>
      )}
    </Layout>
  );
};
