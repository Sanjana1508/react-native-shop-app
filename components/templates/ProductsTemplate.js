import React from "react";

import ProductList from "../organisms/ProductList";

const ProductsTemplate = (props) => {
  return <ProductList data={props.data} navigation={props.navigation} />;
};

export default ProductsTemplate;
