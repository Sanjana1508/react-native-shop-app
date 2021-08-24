import React from "react";
import { FlatList } from "react-native";
import { useDispatch } from "react-redux";

import ProductItem from "../molecules/ProductItem";
import * as cartActions from "../../store/actions/cartActions";

const ProductList = (props) => {
  const dispatch = useDispatch();

  const renderProductItem = (itemData) => {
    return (
      <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetails={() => {
          props.navigation.navigate("ProductDetail", {
            productId: itemData.item.id,
            productTitle: itemData.item.title,
          });
        }}
        onAddToCart={() => {
          dispatch(cartActions.addToCart(itemData.item));
        }}
      />
    );
  };
  return <FlatList data={props.data} renderItem={renderProductItem} />;
};

export default ProductList;
