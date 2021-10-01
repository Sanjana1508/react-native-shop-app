import React from "react";

import OrderList from "../organisms/OrderList";

const OrderTemplate = (props: { data: readonly any[] | null | undefined }) => {
  return <OrderList data={props.data} />;
};

export default OrderTemplate;
