import { AnyAction } from "redux";
import {
  AUTHENTICATE,
  LOGIN,
  LOGOUT,
  SAVE_TOKEN,
  SET_DID_TRY_AL,
  SIGNUP,
} from "../actions/authActions";

type stateType = {
  token: string;
  username: string | null;
  password: string;
  expiry: number;
  didTryAutoLogin: boolean;
};

const initialState: stateType = {
  token: "",
  username: null,
  password: "",
  expiry: 0,
  didTryAutoLogin: false,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        username: action.data.username,
        password: action.data.password,
      };
    case LOGIN:
      return {
        token: action.data.token,
        username: action.data.username,
        password: action.data.password,
        expiry: action.data.expiry,
        didTryAutoLogin: true,
      };
    case SAVE_TOKEN: {
      return {
        ...state,
        token: action.data.token,
        username: action.data.username,
      };
    }
    case LOGOUT:
      console.log("Logging out");
      return {
        initialState,
        didTryAutoLogin: true,
      };
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        username: action.username,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};
