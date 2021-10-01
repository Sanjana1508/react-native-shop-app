import React, { useState } from "react";
import { useDispatch } from "react-redux";

import CartSummary from "../molecules/CartSummary";
import * as ordersActions from "../../store/actions/orderActions";

const CartOrg = (props: { data: Object[]; total: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(props.data, props.total));
    setIsLoading(false);
  };

  return (
    <CartSummary
      total={props.total}
      data={props.data}
      onOrder={sendOrderHandler}
      loading={isLoading}
    />
  );
};

export default CartOrg;
