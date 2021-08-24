import React from "react";
import { useSelector } from "react-redux";

import ProductDetailTemplate from "../../components/templates/ProductDetailTemplate";

const ProductDetailsScreen = (props) => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );
  return <ProductDetailTemplate data={selectedProduct} />;
};

export const screenOptions = (navData) => {
  const productTitle = navData.route.params.productTitle;
  return {
    headerTitle: productTitle,
  };
};

export default ProductDetailsScreen;
