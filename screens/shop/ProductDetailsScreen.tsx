import React from "react";
import { useSelector } from "react-redux";

import ProductDetailTemplate from "../../components/templates/ProductDetailTemplate";
import productsReducer from "../../store/reducers/products";
import cartReducer from "../../store/reducers/cart";
import orderReducer from "../../store/reducers/order";
import product from "../../store/reducers/products";
import { RootState } from "../../App";

const ProductDetailsScreen = (props: Object) => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state: RootState) =>
    state.products.availableProducts.find(
      (product: { id: string }) => product.id === productId
    )
  );
  return <ProductDetailTemplate data={selectedProduct} />;
};

export const screenOptions = (navData: Object) => {
  const productTitle = navData.route.params.productTitle;
  return {
    headerTitle: productTitle,
  };
};

export default ProductDetailsScreen;
