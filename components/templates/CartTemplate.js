import React from "react";
import { View } from "react-native";
import CartList from "../organisms/CartList";

import CartOrg from "../organisms/CartOrg";

const CartTemplate = (props) => {
  return (
    <View>
      <CartOrg data={props.data} total={props.total} />
      <CartList data={props.data} />
    </View>
  );
};

export default CartTemplate;
