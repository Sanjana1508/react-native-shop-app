import React, { useState } from "react";
import { FlatList, Button, Alert, RefreshControl } from "react-native";
import { useDispatch } from "react-redux";
import { gql, useMutation } from "@apollo/client";

import ProductItem from "../molecules/ProductItem";
import * as cartActions from "../../store/actions/cartActions";
import Colors from "../../constants/Colors";
import { cache } from "../../App";
import { allUserProducts } from "../../screens/user/UserProductsScreen";

const allProducts = gql`
  query GetProducts {
    getProducts {
      title
      description
      price
      ownerId
      id
      imageUrl
    }
  }
`;
const del = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
      title
    }
  }
`;

const ProductList = (props: {
  navigation: {
    navigate: (
      arg0: string,
      arg1: { productId: number; productTitle?: string }
    ) => void;
  };
  user: boolean;
  data: readonly any[] | null | undefined;
  refreshing: boolean;
  onRefresh: (() => void) | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [deleteProduct] = useMutation(del, {
    refetchQueries: [{ query: allProducts }, { query: allUserProducts }],
    context: {
      serializationKey: "MUTATION",
      tracked: true,
    },
  });
  const dispatch = useDispatch();
  console.log(props.user);
  const selectItemHandler = (id: number, title: string) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  const editItemHandler = (id: number) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = (id: number) => {
    Alert.alert("Are you sure?", "Do you really wnat to delete the item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          //dispatch(productActions.deleteProduct(id));
          deleteProduct({ variables: { id: id } })
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
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
                editItemHandler(parseInt(itemData.item.id));
              }
            : () => {
                selectItemHandler(
                  parseInt(itemData.item.id),
                  itemData.item.title
                );
              }
        }
      >
        <Button
          color={Colors.primary}
          title={props.user ? "Edit" : "View Details"}
          onPress={
            props.user === true
              ? () => {
                  editItemHandler(parseInt(itemData.item.id));
                }
              : () => {
                  selectItemHandler(
                    parseInt(itemData.item.id),
                    itemData.item.title
                  );
                }
          }
        />
        <Button
          color={Colors.primary}
          title={props.user ? "Delete" : "To Cart"}
          onPress={
            props.user === true
              ? () => {
                  console.log("deleteId:" + itemData.item.id);
                  deleteHandler(parseInt(itemData.item.id));
                  cache.evict({ id: itemData.item.id });
                  cache.gc();
                }
              : () => {
                  dispatch(cartActions.addToCart(itemData.item));
                }
          }
        />
      </ProductItem>
    );
  };
  return (
    <FlatList
      data={props.data}
      renderItem={renderProductItem}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }
    />
  );
};

export default ProductList;
