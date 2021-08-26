import React from 'react';

import OrderList from '../organisms/OrderList';

const OrderTemplate=(props:Object)=>{
return <OrderList data={props.data}/>
}

export default OrderTemplate;