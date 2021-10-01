import React, { useState } from "react";
import { FlatList } from "react-native";

import OrderItem from "../molecules/OrderItem";

const OrderList = (props: { data: readonly any[] | null | undefined }) => {
  const renderOrderItem = (itemData: Object) => {
    return (
      <OrderItem
        amount={itemData.item.totalAmount}
        date={itemData.item.readableDate}
        data={itemData.item.items}
      />
    );
  };
  return <FlatList data={props.data} renderItem={renderOrderItem} />;
};

export default OrderList;
