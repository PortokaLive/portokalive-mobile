import React, { useEffect } from "react";
import { Modal, Card, Text, Button, Layout } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { useSelector } from "../utils/redux/Store";
import { clearActivation } from "../utils/redux/actions/ActionSuccess";
import { Keyboard } from "react-native";
import { resendActivation } from "../utils/redux/actions/ActionAuth";

export const ActivationModalInjector = ({ email }: any) => {
  const renderText = () => (
    <Text style={{ color: "gray" }}>Resend Verification</Text>
  );

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
              Login Success
            </Text>
            <Text>You have not activated your account yet.</Text>
            <Text>Please check your email to activate.</Text>
          </Layout>
          <Button
            style={{
              ...MainTheme.ComponentTheme.backgroundSuccess,
              ...MainTheme.ComponentTheme.borderSuccess,
            }}
            onPress={clearActivation}
          >
            OK
          </Button>
          <Button
            style={{
              marginTop: 10,
              backgroundColor: "white",
              ...MainTheme.ComponentTheme.borderSuccess,
            }}
            onPress={() => {
              resendActivation(email);
              clearActivation();
            }}
          >
            {renderText}
          </Button>
        </Card>
      </Modal>
    </>
  );
};
