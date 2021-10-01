export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export type orderAction = {
  type: string;
  orderData: Object;
};

export const addOrder = (cartItems: Array<Object>, totalAmount: number) => {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount },
  };
};
