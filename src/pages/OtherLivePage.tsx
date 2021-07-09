import { Layout } from "@ui-kitten/components";
import React from "react";
import { WebView } from "react-native-webview";

export default function OtherLivePage(props: any) {
  const { getLive } = props;
  const liveUrl = getLive();

  return (
    <Layout style={{ flex: 1, flexDirection: "row" }}>
      <WebView
        source={{
          uri: liveUrl,
        }}
      />
    </Layout>
  );
}
