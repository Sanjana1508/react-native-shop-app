import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orderActions";
import {orderAction} from '../actions/orderActions';

export type order={
  orders:Array<Order>
}

const initialState:order = {
  orders: [],
};

export default (state = initialState, action:orderAction) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return { ...state, orders: state.orders.concat(newOrder) };
  }
  return state;
};
