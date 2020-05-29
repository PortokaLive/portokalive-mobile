import React, { useReducer, useState } from "react";
import { Layout, Input, Icon, Text, Button } from "@ui-kitten/components";
import { MainTheme } from "../theme/MainTheme";
import { Action } from "../models/Action";
import { UserReducerType } from "../constants/Types";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LogoImage } from "../components/LogoImage";

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

export const LoginScreen = () => {
  const [user, dispatchUser] = useReducer(userReducer, initialUser);
  const [error, dispatchError] = useReducer(errorReducer, initialUser);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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

  return (
    <Layout style={MainTheme.container}>
      <Layout>
        <LogoImage width={100} height={100} padding={10} fontSize={35} />
        <Input
          style={{ marginTop: 20, ...MainTheme.width_90 }}
          placeholder="Email"
          value={user.email}
          onChangeText={handleEmailChange}
        />
        <Text style={MainTheme.textDanger}>{error.email}</Text>
        <Input
          style={MainTheme.width_90}
          secureTextEntry={secureTextEntry}
          accessoryRight={renderIcon}
          placeholder="Password"
          value={user.password}
          onChangeText={handlePasswordChange}
        />
        <Text style={MainTheme.textDanger}>{error.password}</Text>
        <Button style={{ marginTop: 15 }}>Login</Button>
      </Layout>
    </Layout>
  );
};
