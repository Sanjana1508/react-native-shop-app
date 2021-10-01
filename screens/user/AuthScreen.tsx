import React, { useEffect, useState, useReducer, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

import Input from "../../components/atoms/Input";
import Card from "../../components/atoms/Card";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/authActions";
import { AnyAction } from "redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/atoms/CustomHeaderButton";

const REGISTER_USER = gql`
  mutation ($registerUsername: String!, $registerPassword: String!) {
    register(username: $registerUsername, password: $registerPassword) {
      username
      password
    }
  }
`;

const LOGIN_USER = gql`
  query ($loginUsername: String!, $loginPassword: String!) {
    login(username: $loginUsername, password: $loginPassword) {
      username
      token
      password
      expiry
    }
  }
`;

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (
  state: {
    inputValues: {
      username: string;
      password: string;
    };
    inputValidities: any;
    formIsValid: boolean;
  },
  action: AnyAction
) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props: { navigation: Object }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const [registerUser] = useMutation(REGISTER_USER);
  const [loginUser] = useLazyQuery(LOGIN_USER, {
    onCompleted(data) {
      console.log("data.login.token: " + data.login.token);
      dispatch(
        authActions.login(
          data.login.token,
          data.login.username,
          data.login.password,
          data.login.expiry
        )
      );
    },
  });

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      password: "",
    },
    inputValidities: {
      username: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (errorMsg) {
      Alert.alert("An Error Occurred", errorMsg, [{ text: "Okay" }]);
    }
  }, [errorMsg]);

  const authHandler = async () => {
    let action;
    setIsLoading(true);
    setErrorMsg("");
    if (isSignup) {
      try {
        const user = await registerUser({
          variables: {
            registerUsername: formState.inputValues.username,
            registerPassword: formState.inputValues.password,
          },
        });
        dispatch(
          authActions.signup(
            user.data.register.username,
            user.data.register.password
          )
        );
      } catch (err) {
        setErrorMsg(err.message);
        setIsLoading(false);
      }
    } else {
      try {
        console.log("In login");
        loginUser({
          variables: {
            loginUsername: formState.inputValues.username,
            loginPassword: formState.inputValues.password,
          },
        });
      } catch (err) {
        console.log(err);
        setErrorMsg(err.message);
      }
    }
    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="username"
              label="Username"
              keyboardType="default"
              required
              autoCapitalize="none"
              errorText="Please enter a valid username."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = (navData: Object) => {
  return {
    headerTitle: "Authenticate",
  };
};

const styles = StyleSheet.create({
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  screen: { flex: 1 },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
