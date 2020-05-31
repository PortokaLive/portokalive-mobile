import React, { useEffect, useState } from "react";
import { Modal, Card, Text, Button, Layout } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { clearError } from "../utils/redux/actions/ActionError";
import { Keyboard } from "react-native";

export const ErrorModalInjector = ({ title, message }: any) => {
  useEffect(() => {
    Keyboard.dismiss();
  }, [Keyboard]);

  return (
    <>
      <Modal
        visible={true}
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
            style={MainTheme.ComponentTheme.backgroundDanger}
            onPress={() => clearError()}
          >
            OK
          </Button>
        </Card>
      </Modal>
    </>
  );
};
