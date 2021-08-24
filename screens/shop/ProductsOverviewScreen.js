import React from "react";
import { FlatList, Text, Platform } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductsTemplate from "../../components/templates/ProductsTemplate";
import CustomHeaderButton from "../../components/atoms/CustomHeaderButton";

const ProductOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  return <ProductsTemplate data={products} navigation={props.navigation} />;
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "All Products",
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
