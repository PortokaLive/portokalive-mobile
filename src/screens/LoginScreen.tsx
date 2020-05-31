import React, { useReducer, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Layout, Input, Icon, Text, Button } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { Action } from "../models/Action";
import { UserReducerType } from "../constants/Types";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LogoImage } from "../components/LogoImage";
import { EmailRegex } from "../constants/Regex";
import { loginUser } from "../utils/redux/actions/ActionAuth";
import { User } from "../models/User";
import { useSelector } from "../utils/redux/Store";
import { ActivationModalInjector } from "../components/ModalActivation";

const initialUser: User = { email: "", password: "" };

const userReducer = (state = initialUser, action: Action<string>) => {
  switch (action.type) {
    case UserReducerType.Email:
      return Object.assign({}, state, { email: action.payload });
    case UserReducerType.Password:
      return Object.assign({}, state, { password: action.payload });
    default:
      return state;
  }
};

const errorReducer = (state = initialUser, action: Action<string>) => {
  switch (action.type) {
    case UserReducerType.Email:
      return Object.assign({}, state, { email: action.payload });
    case UserReducerType.Password:
      return Object.assign({}, state, { password: action.payload });
    default:
      return state;
  }
};

export const LoginScreen = ({ navigation }: any) => {
  const [user, dispatchUser] = useReducer(userReducer, initialUser);
  const [error, dispatchError] = useReducer(errorReducer, initialUser);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const isError = useSelector((state) => state.globalError);
  const activation = useSelector((state) => state.auth.activation);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const renderSpinner = () => (
    <>
      {loading && <ActivityIndicator color="white" />}
      {!loading && (
        <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
      )}
    </>
  );

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback
      onPress={() => {
        setSecureTextEntry(!secureTextEntry);
      }}
    >
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const validateEmail = (email: string) => {
    if (!email) {
      dispatchError({
        type: UserReducerType.Email,
        payload: "Email is required",
      });
    } else if (!EmailRegex.test(email)) {
      dispatchError({
        type: UserReducerType.Email,
        payload: "Invalid email",
      });
    } else {
      dispatchError({
        type: UserReducerType.Email,
        payload: "",
      });
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      dispatchError({
        type: UserReducerType.Password,
        payload: "Password is required",
      });
    } else {
      dispatchError({
        type: UserReducerType.Password,
        payload: "",
      });
    }
  };

  const handleEmailChange = (value: any) => {
    validateEmail(value);
    dispatchUser({
      type: UserReducerType.Email,
      payload: value,
    });
  };

  const handlePasswordChange = (value: any) => {
    validatePassword(value);
    dispatchUser({
      type: UserReducerType.Password,
      payload: value,
    });
  };

  const handleLogin = () => {
    if (!user.email) {
      handleEmailChange(user.email);
    }
    if (!user.password) {
      handlePasswordChange(user.password);
    }
    if (!error.email && !error.password && user.email && user.password) {
      setLoading(true);
      loginUser(user);
    }
  };

  useEffect(() => {
    if (isError.name || isAuthenticated || !activation.isActivationRequired || activation.isActivationRequired) {
      setLoading(false);
    }
  }, [isError, activation.isActivationRequired,isAuthenticated]);

  return (
    <Layout style={MainTheme.LayoutTheme.container}>
      {!!activation.isActivationRequired && (
        <ActivationModalInjector email={activation.email} />
      )}
      <Layout>
        <LogoImage width={100} height={100} padding={10} fontSize={35} />
        <Input
          style={{ marginTop: 20, ...MainTheme.LayoutTheme.width_90 }}
          placeholder="Email"
          value={user.email}
          onChangeText={handleEmailChange}
        />
        <Text style={MainTheme.TextTheme.textDanger}>{error.email}</Text>
        <Input
          style={MainTheme.LayoutTheme.width_90}
          secureTextEntry={secureTextEntry}
          accessoryRight={renderIcon}
          placeholder="Password"
          value={user.password}
          onChangeText={handlePasswordChange}
        />
        <Text style={MainTheme.TextTheme.textDanger}>{error.password}</Text>
        <Button
          disabled={loading}
          style={{ marginTop: 15 }}
          onPress={handleLogin}
        >
          {renderSpinner}
        </Button>
        <Layout
          style={{
            marginTop: 50,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>No account yet? Register </Text>
          <Text
            style={{
              ...MainTheme.TextTheme.textBold,
              ...MainTheme.TextTheme.textPrimary,
            }}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            here
          </Text>
        </Layout>
      </Layout>
    </Layout>
  );
};
