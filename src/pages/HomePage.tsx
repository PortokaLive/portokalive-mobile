import React from "react";
import { Image, View, SafeAreaView, FlatList, Platform } from "react-native";
import { useSelector } from "../utils/redux/Store";
import { getLiveLists } from "../utils/redux/actions/ActionLive";
import { Card, Layout, Spinner, Text } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { NodeMediaClient } from "react-native-nodemediaclient";
import { requestCameraPermission } from "../utils/helpers/RequestHelper";

export default ({ navigate, setSelectedLive }: any) => {
  const [isLoading, setLoading] = React.useState(false);
  const [isScrollLoading, setScrollLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const liveStreams = useSelector((state) => state?.live?.liveList ?? []);
  const auth = useSelector((state) => state?.auth?.user);

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
  }, []);

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

  const handleDirectToLive = (player: string) => () => {
    setSelectedLive(player);
    navigate(3);
  };

  const renderItem = ({ item: stream }: any) => (
    <Layout key={stream?.name} style={MainTheme.DefaultTheme.paddingBox}>
      <Card
        onPress={handleDirectToLive(stream?.assets?.player)}
        style={MainTheme.DefaultTheme.cardContainer}
        header={() => (
          <View
            style={{
              ...MainTheme.DefaultTheme.paddingBox,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}>
            <View
              style={{
                ...(stream?.broadcasting
                  ? MainTheme.ComponentTheme.borderSuccess
                  : MainTheme.ComponentTheme.borderDanger),
                borderWidth: 1,
              }}>
              <Text
                style={
                  stream?.broadcasting
                    ? MainTheme.TextTheme.textSuccess
                    : MainTheme.TextTheme.textDanger
                }>
                {stream?.broadcasting ? "Online" : "Offline"}
              </Text>
            </View>
          </View>
        )}
        footer={() => (
          <View style={MainTheme.DefaultTheme.paddingBox}>
            <Text style={{ color: "darkgray" }}>{stream?.name}</Text>
          </View>
        )}>
        <Image
          style={{
            width: 350,
            height: 150,
          }}
          source={require("../assets/live.png")}
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
        }}>
        <Spinner size="large" />
      </View>
    );
  };

  const currentUser = auth.email.split("@")[0];

  const displayingLive = liveStreams
    .filter((v: any) => v.name !== currentUser)
    .map((v: any, index: number) => ({
      ...v,
      key: index,
    }));

  return (
    <Layout style={MainTheme.LayoutTheme.container}>
      {displayingLive?.length ? (
        <FlatList
          data={displayingLive}
          renderItem={renderItem}
          keyExtractor={(item) => item?.key}
          onRefresh={handleOnRefresh}
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
