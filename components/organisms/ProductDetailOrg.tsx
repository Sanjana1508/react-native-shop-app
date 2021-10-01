import React from "react";
import { useDispatch } from "react-redux";

import ProductDetail from "../molecules/ProductDetail";
import * as cartActions from "../../store/actions/cartActions";
import Product from "../../models/product";

const ProductDetailOrg = (props: { data: Product }) => {
  const dispatch = useDispatch();
  return (
    <ProductDetail
      data={props.data}
      onAddToCart={() => {
        dispatch(cartActions.addToCart(props.data));
      }}
    />
  );
};

export default ProductDetailOrg;
