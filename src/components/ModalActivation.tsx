import React, { useEffect } from "react";
import { Modal, Card, Text, Button, Layout } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { useSelector } from "../utils/redux/Store";
import { clearActivation } from "../utils/redux/actions/ActionSuccess";
import { Keyboard } from "react-native";
import { resendActivation } from "../utils/redux/actions/ActionAuth";
import { DeepLinking } from "./DeepLinking";

export const ActivationModalInjector = ({ email }: any) => {
  const renderText = () => (
    <Text style={{ color: "gray" }}>Resend Verification</Text>
  );

  useEffect(() => {
    Keyboard.dismiss();
  }, [Keyboard]);

  return (
    <>
      <DeepLinking />
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
            <Text>Do not close the app.</Text>
          </Layout>
          <Button
            style={{
              marginTop: 10,
              backgroundColor: "white",
              ...MainTheme.ComponentTheme.borderSuccess,
            }}
            onPress={() => {
              resendActivation(email);
            }}
          >
            {renderText}
          </Button>
        </Card>
      </Modal>
    </>
  );
};
