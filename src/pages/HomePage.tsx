import React from "react";
import { Image, View, SafeAreaView, FlatList } from "react-native";
import { useSelector } from "../utils/redux/Store";
import { getLiveLists } from "../utils/redux/actions/ActionLive";
import { Card, Layout, Spinner, Text } from "@ui-kitten/components";
import { MainTheme } from "../theme";

export default () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isScrollLoading, setScrollLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const liveStreams = useSelector((state) => state?.live?.liveList ?? []);

  React.useEffect(() => {
    page === 1 ? setLoading(true) : setScrollLoading(true);
    getLiveLists(page, page === 1)
      .catch((ex) => {
        console.error(ex);
      })
      .finally(() => {
        setTimeout(() => {
          page === 1 ? setLoading(false) : setScrollLoading(false);
        }, 1000);
      });
  }, [page]);

  if (isLoading) {
    return (
      <Layout style={MainTheme.LayoutTheme.container}>
        <Image
          style={{ width: 300, height: 300 }}
          source={require("../assets/live_loading.png")}
        />
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          Hmm...Who's on live now?
        </Text>
      </Layout>
    );
  }

  const renderItem = ({ item: stream, index }: any) => (
    <Layout key={index} style={MainTheme.DefaultTheme.paddingBox}>
      <Card
        style={MainTheme.DefaultTheme.cardContainer}
        header={() => (
          <View
            style={{
              ...MainTheme.DefaultTheme.paddingBox,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                ...(stream?.broadcasting
                  ? MainTheme.ComponentTheme.borderSuccess
                  : MainTheme.ComponentTheme.borderDanger),
                borderWidth: 1,
              }}
            >
              <Text
                style={
                  stream?.broadcasting
                    ? MainTheme.TextTheme.textSuccess
                    : MainTheme.TextTheme.textDanger
                }
              >
                {stream?.broadcasting ? "Online" : "Offline"}
              </Text>
            </View>
          </View>
        )}
        footer={() => (
          <View style={MainTheme.DefaultTheme.paddingBox}>
            <Text style={{ color: "darkgray" }}>{stream?.name}</Text>
          </View>
        )}
      >
        <Image
          style={{
            width: 350,
            height: 150,
          }}
          source={
            stream?.assets?.thumbnail
              ? { uri: stream?.assets?.thumbnail }
              : require("../assets/live.png")
          }
        />
      </Card>
    </Layout>
  );

  const handleOnRefresh = () => {
    setPage(1);
  };

  const handleEndReached = () => {
    setPage(page + 1);
  };

  const renderFooter = () => {
    if (!isScrollLoading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "gray",
        }}
      >
        <Spinner size="large" />
      </View>
    );
  };

  return (
    <Layout style={MainTheme.LayoutTheme.container}>
      {liveStreams?.length ? (
        <FlatList
          data={liveStreams}
          renderItem={renderItem}
          keyExtractor={(item) => item?.listStreamId}
          onRefresh={handleOnRefresh}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshing={isLoading}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <>
          <Image
            style={{ width: 300, height: 300 }}
            source={require("../assets/empty.png")}
          />
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            No one is broadcasting.
          </Text>
        </>
      )}
    </Layout>
  );
};
