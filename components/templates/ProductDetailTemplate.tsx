import React from "react";

import ProductDetailOrg from '../organisms/ProductDetailOrg';

const ProductDetailTemplate = (props:Object) => {
  return <ProductDetailOrg data={props.data} />;
};

export default ProductDetailTemplate;
