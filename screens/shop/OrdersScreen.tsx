import React from "react";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Platform, View, Text } from "react-native";

import Order from "../../models/order";
import OrderTemplate from "../../components/templates/OrderTemplate";
import CustomHeaderButton from "../../components/atoms/CustomHeaderButton";
import { RootState } from "../../App";

const OrderScreen = (props: Object) => {
  const orders: Array<Order> = useSelector(
    (state: RootState) => state.orders.orders
  );
  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No orders found. Try ordering some!</Text>
      </View>
    );
  }
  return <OrderTemplate data={orders} />;
};

export const screenOptions = (navData: Object) => {
  return {
    headerTitle: "Your Orders",
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
  };
};

export default OrderScreen;
