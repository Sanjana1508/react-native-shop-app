import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/authActions";

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const username = await AsyncStorage.getItem("username");
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("startup token" + token);
        dispatch(authActions.setDidTryAl());
      } else {
        const expiry = await AsyncStorage.getItem("expirationDate");
        if (expiry) {
          const expirationDate = new Date(expiry);
          if (expirationDate <= new Date() || !username) {
            dispatch(authActions.setDidTryAl());
          } else {
            const expirationTime =
              expirationDate.getTime() - new Date().getTime();
            dispatch(authActions.authenticate(username, token, expirationTime));
          }
        }
      }
    };

    tryLogin();
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
