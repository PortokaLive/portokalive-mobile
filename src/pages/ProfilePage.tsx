import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import {
  Button,
  Text,
  Icon,
  Divider,
  Card,
  Layout,
} from "@ui-kitten/components";
import { logoutUser } from "../utils/redux/actions/ActionAuth";
import { useSelector } from "../utils/redux/Store";

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
  list: { display: "flex", flexDirection: "row", padding: 5 },
});

export default ({ navigation }: any) => {
  const auth = useSelector<any>((state) => state?.auth?.user);

  const isActivated = auth?.activated ? (
    <Icon name="checkmark-circle-2" fill="limegreen" style={styles.icon} />
  ) : (
    <Icon name="close-circle" fill="red" style={styles.icon} />
  );

  return (
    <Layout style={{ flex: 1 }}>
      <Card style={{ width: Dimensions.get("window").width, marginTop: 200 }}>
        <View style={styles.list}>
          <View style={{ flex: 6 }}>
            <Text>Email</Text>
          </View>
          <View style={{ flex: 6 }}>
            <Text>{auth?.email}</Text>
          </View>
        </View>
        <Divider />
        <View style={styles.list}>
          <View style={{ flex: 6 }}>
            <Text>Activated</Text>
          </View>
          <View style={{ flex: 6 }}>{isActivated}</View>
        </View>
        <Divider />
        <View style={styles.list}>
          <View style={{ flex: 6 }}>
            <Text>Live Stream ID</Text>
          </View>
          <View style={{ flex: 6 }}>
            <Text>{auth?.liveStreamId}</Text>
          </View>
        </View>
        <Divider />
        <Button
          style={{ marginTop: 150 }}
          onPress={() => logoutUser(navigation)}>
          Logout
        </Button>
      </Card>
    </Layout>
  );
};
