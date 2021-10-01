import AsyncStorage from "@react-native-async-storage/async-storage";
import { clockRunning } from "react-native-reanimated";
import { useDispatch } from "react-redux";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const SAVE_TOKEN = "SAVE_TOKEN";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

let timer: NodeJS.Timeout | number;

export const setDidTryAl = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (
  username: string,
  token: string,
  expiry: number
) => {
  setLogoutTimer(expiry);
  return { type: AUTHENTICATE, username: username, token: token };
};

export const signup = (username: string, password: string) => {
  return { type: SIGNUP, data: { username, password } };
};

export const login = (
  token: string,
  username: string,
  password: string,
  expiry: number
) => {
  saveDataToStorage(token, username);
  setLogoutTimer(expiry);
  const expirationDate = new Date(new Date().getTime() + expiry * 1000);
  AsyncStorage.setItem("expirationDate", expirationDate.toISOString());
  return { type: LOGIN, data: { token, username, password, expiry } };
};

export const saveToken = (token: string, username: string) => {
  saveDataToStorage(token, username);
  return { type: SAVE_TOKEN, data: { token: token, username: username } };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("token");
  AsyncStorage.removeItem("username");
  AsyncStorage.removeItem("expirationDate");
  console.log("In Logout");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  console.log("In clearLogout timer");
  clearTimeout(Number(timer));
};

const setLogoutTimer = (expirationTime: number) => {
  console.log("In setLogout timer" + expirationTime);
  timer = setTimeout(logout, expirationTime * 1000);
};

const saveDataToStorage = (token: string, username: string) => {
  AsyncStorage.setItem("token", token);
  AsyncStorage.setItem("username", username);
};
