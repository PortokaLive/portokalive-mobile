import React, { useEffect } from "react";
import { Platform, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "../utils/redux/Store";

export const DeepLinking = () => {
  const isActivationCompleted = useSelector(
    (state) => state.auth.activation.isActivationCompleted
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigation = useNavigation();
  useEffect(() => {
    if (isActivationCompleted) {
      return;
    } else {
      if (Platform.OS === "android") {
        Linking.getInitialURL().then((url) => {
          if (url) {
            doNavigate(url);
          }
        });
      }
      Linking.addEventListener("url", handleOpenURL);

      return () => {
        Linking.removeEventListener("url", handleOpenURL);
      };
    }
  }, [isActivationCompleted]);

  const handleOpenURL = (event: any) => {
    doNavigate(event.url);
  };

  const getParamsFromUrl = (url: string) => {
    let paramList = [];
    const params = url.split("?")[1].split("&");

    for (const param of params) {
      paramList.push(param.split("=")[1]);
    }

    const [email, activationCode] = paramList;
    return {
      email,
      activationCode,
    };
  };

  const doNavigate = (url: string) => {
    const route = url.replace(/.*?:\/\//g, "");
    if (route.includes("activate-account")) {
      const { email, activationCode } = getParamsFromUrl(route);
      navigation.navigate(isAuthenticated ? "Home" : "Activate", {
        email,
        activationCode,
      });
    }
  };
  return <></>;
};
