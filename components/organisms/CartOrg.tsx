import React from "react";
import { useDispatch } from "react-redux";

import CartSummary from '../molecules/CartSummary';
import * as ordersActions from '../../store/actions/orderActions';

const CartOrg = (props:Object) => {
  const dispatch = useDispatch();
  return (
    <CartSummary
      total={props.total}
      data={props.data}
      onOrder={() => {
        dispatch(ordersActions.addOrder(props.data, props.total));
      }}
    />
  );
};

export default CartOrg;
