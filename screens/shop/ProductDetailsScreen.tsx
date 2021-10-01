import React from "react";
import { useSelector } from "react-redux";
import { gql, useQuery } from "@apollo/client";

import ProductDetailTemplate from "../../components/templates/ProductDetailTemplate";
import { RootState } from "../../App";
import { Product, QueryGetProductArgs } from "../../types";

const getProduct = gql`
  query GetProduct($id: Int!) {
    getProduct(id: $id) {
      title
      description
      price
      ownerId
      id
      imageUrl
    }
  }
`;

const ProductDetailsScreen = (props: {
  route: { params: { productId: number } };
}) => {
  const productId = props.route.params.productId;
  const { loading, error, data } = useQuery<
    { getProduct: Array<Product> },
    QueryGetProductArgs
  >(getProduct, {
    variables: { id: productId },
  });
  console.log(error);
  const selectedProduct = useSelector((state: RootState) =>
    state.products.availableProducts.find(
      (product: { id: number }) => product.id === productId
    )
  );

  console.log("productId:" + productId);
  return <ProductDetailTemplate data={data && data.getProduct} />;
};

export const screenOptions = (navData: Object) => {
  const productTitle = navData.route.params.productTitle;
  return {
    headerTitle: productTitle,
  };
};

export default ProductDetailsScreen;
