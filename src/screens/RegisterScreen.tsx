import React, { useReducer, useState, useEffect } from "react";
import { Layout, Input, Icon, Text, Button } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { Action } from "../models/Action";
import { UserReducerType } from "../constants/Types";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LogoImage } from "../components/LogoImage";
import {
  EmailRegex,
  DigitRegex,
  LowerCaseRegex,
  UpperCaseRegex,
  SpecialCharRegex,
} from "../constants/Regex";
import { registerUser } from "../utils/redux/actions/ActionAuth";
import { ActivityIndicator } from "react-native";
import { useSelector } from "../utils/redux/Store";

const initialUser = { email: "", password: "" };

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

export const RegisterScreen = ({ navigation }: any) => {
  const [user, dispatchUser] = useReducer(userReducer, initialUser);
  const [error, dispatchError] = useReducer(errorReducer, initialUser);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const isError = useSelector((state) => state.globalError);
  const isActivationRequired = useSelector(
    (state) => state.auth.activation.isActivationRequired
  );

  const renderSpinner = () => (
    <>
      {loading && <ActivityIndicator color="white" />}
      {!loading && (
        <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
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
    } else if (!LowerCaseRegex.test(password)) {
      dispatchError({
        type: UserReducerType.Password,
        payload: "Password requires a lower-case character",
      });
    } else if (!UpperCaseRegex.test(password)) {
      dispatchError({
        type: UserReducerType.Password,
        payload: "Password requires an upper-case character",
      });
    } else if (!DigitRegex.test(password)) {
      dispatchError({
        type: UserReducerType.Password,
        payload: "Password requires a number",
      });
    } else if (!SpecialCharRegex.test(password)) {
      dispatchError({
        type: UserReducerType.Password,
        payload: "Password requires a special character",
      });
    } else if (password.length < 8) {
      dispatchError({
        type: UserReducerType.Password,
        payload: "Password requires 8 characters",
      });
    } else if (password.length > 16) {
      dispatchError({
        type: UserReducerType.Password,
        payload: "Password cannot be more than 16 characters",
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

  const handleRegister = () => {
    if (!user.email) {
      handleEmailChange(user.email);
    }
    if (!user.password) {
      handlePasswordChange(user.password);
    }
    if (!error.email && !error.password && user.email && user.password) {
      setLoading(true);
      registerUser(user);
    }
  };

  useEffect(() => {
    if (isError.name || !isActivationRequired || isActivationRequired) {
      setLoading(false);
    }
    if (isActivationRequired) {
      navigation.navigate("Login");
    }
  }, [isError, isActivationRequired]);

  return (
    <Layout style={MainTheme.LayoutTheme.container}>
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
          onPress={handleRegister}
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
          <Text>Already have an account? Login </Text>
          <Text
            style={{
              ...MainTheme.TextTheme.textBold,
              ...MainTheme.TextTheme.textPrimary,
            }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            here
          </Text>
        </Layout>
      </Layout>
    </Layout>
  );
};
