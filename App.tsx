import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { LogBox, StyleSheet } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as Notifications from "expo-notifications";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import NetInfo from "@react-native-community/netinfo";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistCache } from "apollo3-cache-persist";
import QueueLink from "apollo-link-queue";
import SerializingLink from "apollo-link-serialize";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import AppNavigator from "./navigation/AppNavigator";

LogBox.ignoreLogs(["Setting a timer"]);

export type RootState = ReturnType<typeof rootReducer>;

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getProducts: {
          keyArgs: false,
          merge(existing: any[], incoming: any[], params: Record<string, any>) {
            const offset = params.variables.offset;
            const merged = existing ? existing.slice(0) : [];
            const end = offset + incoming.length;
            for (let i = offset; i < end; ++i) {
              merged[i] = incoming[i - offset];
            }
            console.log("merged:" + merged);
            return merged;
          },
        },
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: "http://192.168.101.6:4000/graphql",
});

export const queueLink = new QueueLink();
const serializingLink = new SerializingLink();

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([
    authLink,
    errorLink,
    queueLink as unknown as ApolloLink,
    serializingLink as unknown as ApolloLink,
    httpLink,
  ]),
  cache,
  defaultOptions: {
    watchQuery: { pollInterval: 0 },
  },
  name: "The Shop App",
  version: "1.0",
});

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [loadingCache, setLoadingCache] = useState(true);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setOnline(true);
        queueLink.open();
      } else {
        setOnline(false);
        queueLink.close();
      }
    });
    console.log("Online:" + online);
    return () => unsubscribe();
  }, []);

  console.log("appqueue-keys" + Object.keys(queueLink));
  console.log("appqueue-values" + Object.values(queueLink));

  if (!isFontLoaded || loadingCache) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppNavigator />
        <StatusBar style="auto" />
      </Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
