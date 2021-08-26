import React from "react";
import { Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Platform } from "react-native";

import CustomHeaderButton from "../../components/atoms/CustomHeaderButton";
import AddOrEditProductTemplate from "../../components/templates/AddOrEditProductTemplate";

const EditProductScreen = (props: Object) => {
  return (
    <AddOrEditProductTemplate
      route={props.route}
      navigation={props.navigation}
    />
  );
};

export const screenOptions = (navData: Object) => {
  const submitFn = navData.route.params ? navData.route.params.submit : null;
  return {
    headerTitle: navData.route.params.productId
      ? "Edit Product"
      : "Add Product",
  };
};

export default EditProductScreen;
