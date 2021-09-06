import React from "react";
import { FlatList, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";

import ProductItem from "../molecules/ProductItem";
import * as cartActions from "../../store/actions/cartActions";
import * as productActions from "../../store/actions/productActions";
import Colors from "../../constants/Colors";

const ProductList = (props: Object) => {
  const dispatch = useDispatch();

  const selectItemHandler = (id: string, title: string) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  const editItemHandler = (id: string) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = (id: string) => {
    Alert.alert("Are you sure?", "Do you really wnat to delete the item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        },
      },
    ]);
  };

  const renderProductItem = (itemData: Object) => {
    return (
      <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={
          props.user === true
            ? () => {
                editItemHandler(itemData.item.id);
              }
            : () => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }
        }
      >
        <Button
          color={Colors.primary}
          title={props.user ? "Edit" : "View Details"}
          onPress={
            props.user === true
              ? () => {
                  editItemHandler(itemData.item.id);
                }
              : () => {
                  selectItemHandler(itemData.item.id, itemData.item.title);
                }
          }
        />
        <Button
          color={Colors.primary}
          title={props.user ? "Delete" : "To Cart"}
          onPress={
            props.user === true
              ? deleteHandler.bind(this, itemData.item.id)
              : () => {
                  dispatch(cartActions.addToCart(itemData.item));
                }
          }
        />
      </ProductItem>
    );
  };
  return <FlatList data={props.data} renderItem={renderProductItem} />;
};

export default ProductList;
