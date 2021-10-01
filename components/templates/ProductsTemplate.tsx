import React from "react";

import ProductList from "../organisms/ProductList";

const ProductsTemplate = (props: Object) => {
  return (
    <ProductList
      data={props.data}
      navigation={props.navigation}
      user={props.user}
      refreshing={props.refreshing}
      onRefresh={props.onRefresh}
    />
  );
};

export default ProductsTemplate;
