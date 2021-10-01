import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Platform, Alert, View, Text } from "react-native";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductsTemplate from "../../components/templates/ProductsTemplate";
import CustomHeaderButton from "../../components/atoms/CustomHeaderButton";
import { RootState } from "../../App";
import * as productActions from "../../store/actions/productActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product, QueryGetUserProductsArgs } from "../../types";
import { queueLink } from "../../App";

export const allUserProducts = gql`
  query GetUserProducts {
    getUserProducts(ownerId: "sanjana") {
      title
      description
      price
      ownerId
      id
      imageUrl
    }
  }
`;

const UserProductsScreen = (props: Object) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");

  const getOwnerId = async () => {
    let username;
    await AsyncStorage.getItem("username")
      .then((res) => {
        // console.log("res" + res);
        if (res !== null) setUsername(res);
      })
      .catch((err) => console.log(err));
  };
  console.log("Username:" + username);

  getOwnerId();
  const {
    data = [],
    error,
    loading,
  } = useQuery(allUserProducts, {
    variables: { ownerId: username },
    fetchPolicy: "cache-and-network",
  });

  console.log("data:" + data.getUserProducts);
  console.log("queue-keys" + Object.keys(queueLink));
  console.log("queue-values" + Object.values(queueLink));

  const loadProducts = useCallback(async () => {
    try {
      if (data)
        await dispatch(productActions.fetchProducts(data.getUserProducts));
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    loadProducts().then(() => setIsLoading(false));
    console.log("appqueue-keys " + Object.keys(queueLink));
    console.log("appqueue-values " + Object.values(queueLink));
  }, [dispatch, loadProducts]);

  if (!data && data.getUserProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No products found,maybe start creating some!</Text>
      </View>
    );
  }

  // const userProducts = useSelector(
  //   (state: RootState) => state.products.userProducts
  // );
  dispatch(productActions.fetchProducts(data.getUserProducts));
  return (
    <ProductsTemplate
      data={data.getUserProducts}
      navigation={props.navigation}
      user={true}
    />
  );
};

export const screenOptions = (navData: Object) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => {
              navData.navigation.navigate("EditProduct");
            }}
          />
        </HeaderButtons>
      );
    },
  };
};
export default UserProductsScreen;
