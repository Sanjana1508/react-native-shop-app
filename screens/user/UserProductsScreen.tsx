import React from "react";
import { useSelector } from "react-redux";
import { Platform, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductsTemplate from "../../components/templates/ProductsTemplate";
import CustomHeaderButton from "../../components/atoms/CustomHeaderButton";
import { RootState } from "../../App";

const UserProductsScreen = (props: Object) => {
  const userProducts = useSelector(
    (state: RootState) => state.products.userProducts
  );

  return (
    <ProductsTemplate
      data={userProducts}
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
