import React from "react";
import Product from "../../models/product";

import ProductDetailOrg from "../organisms/ProductDetailOrg";

const ProductDetailTemplate = (props: { data: Product }) => {
  return <ProductDetailOrg data={props.data} />;
};

export default ProductDetailTemplate;
