import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  Button,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { gql, useQuery } from "@apollo/client";

import ProductsTemplate from "../../components/templates/ProductsTemplate";
import CustomHeaderButton from "../../components/atoms/CustomHeaderButton";
import { cache, RootState } from "../../App";
import * as productActions from "../../store/actions/productActions";
import Colors from "../../constants/Colors";
import { Product, QueryGetProductsArgs } from "../../types";

export const allProducts = gql`
  query GetProducts($offset: Int, $limit: Int) {
    getProducts(offset: $offset, limit: $limit) {
      title
      description
      price
      ownerId
      id
      imageUrl
    }
  }
`;

let productsOverview: Array<Product> = [];

const ProductOverviewScreen = (props: {
  navigation: { addListener: (arg0: string, arg1: () => Promise<void>) => any };
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let offset = 0;
  const { error, data, loading, fetchMore } = useQuery<
    { getProducts: Array<Product> } | undefined,
    QueryGetProductsArgs
  >(allProducts, {
    variables: { offset: 0, limit: 1 },
    fetchPolicy: "cache-and-network",
  });
  console.log("All Products" + loading);
  if (error) {
    setErrorMsg(error.message);
  }

  const loadProducts = useCallback(async () => {
    setErrorMsg("");
    setIsRefreshing(true);
    try {
      if (data) {
        await dispatch(productActions.fetchProducts(data.getProducts));
        setIsRefreshing(false);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  }, [dispatch, setIsLoading, setErrorMsg]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadProducts);
    return () => {
      unsubscribe();
    };
  }, [loadProducts]);

  if (data) {
    var productsOverview: Array<Product> = data.getProducts;
  }
  // const products = useSelector(
  //   (state: RootState) => state.products.availableProducts
  // );

  if (errorMsg !== "") {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && data && data.getProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. May be start adding some!</Text>
      </View>
    );
  }

  return (
    <View style={{ paddingBottom: 20 }}>
      <ProductsTemplate
        onRefresh={() => loadProducts()}
        refreshing={isRefreshing}
        data={data && data.getProducts}
        navigation={props.navigation}
        user={false}
      />
      <Button
        title="load more"
        color={Colors.primary}
        onPress={() => {
          fetchMore({
            variables: { offset: data && data.getProducts.length },
          }).then((res) => console.log(res));
          cache.gc();
        }}
      />
    </View>
  );
};

export const allProductsOverview = productsOverview;

export const screenOptions = (navData: Object) => {
  return {
    headerTitle: "All Products",
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
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {
              navData.navigation.navigate("Cart");
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    padding: 40,
  },
});

export default ProductOverviewScreen;
