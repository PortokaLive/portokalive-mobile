import React from "react";
import { Modal, Card, Text, Button, Layout } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { clearError } from "../utils/redux/actions/ActionError";

export const SuccessModalInjector = ({ visible, title, message }: any) => {
  return (
    <>
      <Modal
        visible={visible}
        backdropStyle={MainTheme.LayoutTheme.blackTransparentBackground}
      >
        <Card disabled={true}>
          <Layout
            style={{ ...MainTheme.LayoutTheme.container, paddingVertical: 15 }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                width: 250,
                textAlign: "center",
              }}
            >
              {title}
            </Text>
            <Text style={{ fontSize: 18 }}>{message}</Text>
          </Layout>
          <Button
            style={MainTheme.ComponentTheme.backgroundSuccess}
            onPress={() => clearError()}
          >
            OK
          </Button>
        </Card>
      </Modal>
    </>
  );
};
