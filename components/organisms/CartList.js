import React from "react";
import { FlatList } from "react-native";
import { useDispatch } from "react-redux";

import CartItem from "../molecules/CartItem";
import * as cartActions from "../../store/actions/cartActions";

const CartList = (props) => {
  const dispatch = useDispatch();

  const renderCartItem = (itemData) => {
    return (
      <CartItem
        quantity={itemData.item.quantity}
        title={itemData.item.productTitle}
        amount={itemData.item.sum}
        onRemove={() => {
          dispatch(cartActions.removeFromCart(itemData.item.productId));
        }}
      />
    );
  };
  return (
    <FlatList
      data={props.data}
      keyExtractor={(item) => item.productId}
      renderItem={renderCartItem}
    />
  );
};

export default CartList;
