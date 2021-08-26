import React from "react";
import { useSelector } from "react-redux";

import CartTemplate from "../../components/templates/CartTemplate";
import { RootState } from "../../App";

const CartScreen = (props: Object) => {
  const cartTotalAmount = useSelector(
    (state: RootState) => state.cart.totalAmount
  );
  const cartItems = useSelector((state: RootState) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  return <CartTemplate data={cartItems} total={cartTotalAmount} />;
};

export const screenOptions = () => {
  return { headerTitle: "Your Cart" };
};

export default CartScreen;
