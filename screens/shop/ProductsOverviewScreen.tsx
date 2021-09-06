import React from "react";
import { FlatList, Text, Platform } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { gql, useQuery } from "@apollo/client";

import ProductsTemplate from "../../components/templates/ProductsTemplate";
import CustomHeaderButton from "../../components/atoms/CustomHeaderButton";
import { RootState } from "../../App";

const allProducts = gql`
  query {
    getProducts {
      title
      description
      price
      ownerId
      id
    }
  }
`;

const ProductOverviewScreen = (props: Object) => {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  );

  const { loading, error, data } = useQuery(allProducts);

  return (
    <ProductsTemplate
      data={products}
      navigation={props.navigation}
      user={false}
    />
  );
};

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

export default ProductOverviewScreen;
