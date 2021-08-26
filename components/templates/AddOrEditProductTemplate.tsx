import React from 'react';

import ProductManager from '../organisms/ProductManager';

const AddOrEditProductTemplate=(props:Object)=>{
return <ProductManager route={props.route} navigation={props.navigation}/>
}

export default AddOrEditProductTemplate;