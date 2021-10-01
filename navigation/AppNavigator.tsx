import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NavigationAction } from "@react-navigation/native";

import { AuthNavigator, ShopNavigator } from "./ShopNavigator";
import { RootState } from "../App";
import { store } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StartupScreen from "../screens/StartupScreen";

const AppNavigator = () => {
  const [isAuth, setIsAuth] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token);
  let isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  const didTryAutoLogin = useSelector(
    (state: RootState) => state.auth.didTryAutoLogin
  );
  console.log(token);
  console.log("isAuthenticated" + isAuthenticated);
  console.log("didTryAl" + didTryAutoLogin);
  useEffect(() => {
    console.log("token  changed");
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        console.log("token is present");
        isAuthenticated = true;
      }
    };
    getToken();

    if (token && !isAuth) {
      setIsAuth(true);
    } else if (!token) {
      setIsAuth(false);
    }
  }, [token]);

  // useEffect(() => {
  //   const tryLogin = async () => {};
  //   tryLogin();
  // });

  // useEffect(()=>{
  //   if(!isAuth){
  //     navRef.current.dispatch(NavigationAction.navigate({routeName:'Auth'}))
  //   }
  // },[isAuthenticated])

  console.log(isAuth);
  return (
    <NavigationContainer>
      {isAuthenticated && <ShopNavigator />}
      {!isAuthenticated && didTryAutoLogin && <AuthNavigator />}
      {!isAuthenticated && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
