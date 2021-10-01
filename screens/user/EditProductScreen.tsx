import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import { gql, useMutation } from "@apollo/client";

import CustomHeaderButton from "../../components/atoms/CustomHeaderButton";
import Input from "../../components/atoms/Input";
import { AnyAction } from "redux";
import { RootState } from "../../App";
import Colors from "../../constants/Colors";
import {
  Maybe,
  MutationCreateProductArgs,
  MutationUpdateProductArgs,
  Product,
} from "../../types";
import { allUserProducts } from "./UserProductsScreen";
import { cache, queueLink } from "../../App";

const create = gql`
  mutation CreateProduct(
    $ownerId: String!
    $title: String!
    $imageUrl: String!
    $description: String!
    $price: Float!
  ) {
    createProduct(
      ownerId: $ownerId
      title: $title
      imageUrl: $imageUrl
      description: $description
      price: $price
    ) {
      id
      title
      imageUrl
      description
      ownerId
      price
    }
  }
`;

const update = gql`
  mutation UpdateProduct(
    $id: Int!
    $ownerId: String
    $title: String
    $imageUrl: String
    $description: String
    $price: Float
  ) {
    updateProduct(
      id: $id
      ownerId: $ownerId
      title: $title
      imageUrl: $imageUrl
      description: $description
      price: $price
    ) {
      title
      description
      price
      ownerId
      id
      imageUrl
    }
  }
`;

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
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (
  state: {
    inputValues: {
      title: string;
      imageUrl: string;
      description: string;
      price: string;
    };
    inputValidities: any;
    formIsValid: boolean;
  },
  action: AnyAction
) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = (props: {
  route: { params: { productId: number } };
  navigation: {
    goBack: () => void;
    setOptions: (arg0: { headerRight: () => JSX.Element }) => void;
  };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [erroMsg, setErrorMsg] = useState("");

  const [createProduct] = useMutation(create, {
    refetchQueries: [{ query: allProducts }, { query: allUserProducts }],
    context: {
      serializationKey: "MUTATION",
      tracked: true,
    },
    update(cache, { data: { createProduct } }) {
      cache.modify({
        fields: {
          getUserProducts(existingProducts = []) {
            const newProductRef = cache.writeFragment({
              data: createProduct,
              fragment: gql`
                fragment newProduct on Product {
                  title
                  description
                  price
                  ownerId
                  id
                  imageUrl
                }
              `,
            });
            return [...existingProducts, newProductRef];
          },
        },
      });
    },
  });

  const [updateProduct] = useMutation<
    Maybe<Product>,
    MutationUpdateProductArgs
  >(update, {
    refetchQueries: [{ query: allProducts }, { query: allUserProducts }],
    context: {
      serializationKey: "MUTATION",
      tracked: true,
    },
  });

  const dispatch = useDispatch();

  const prodId = props.route.params ? props.route.params.productId : -1;
  const editedProduct = useSelector((state: RootState) =>
    state.products.userProducts.find((prod: { id: any }) => prod.id === prodId)
  );
  const username = useSelector((state: RootState) => state.auth.username);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const updatedTitle = "updated title";
  const updatedDesc = "updated description";
  const updatedImage =
    "https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  const updatedPrice = 10;
  const updatedOwnerId = "jane";

  const submitHandler = useCallback(() => {
    console.log("queue" + queueLink);
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    setErrorMsg("");
    setIsLoading(true);
    try {
      if (editedProduct) {
        updateProduct({
          variables: {
            id: prodId,
            title: formState.inputValues.title,
            imageUrl: formState.inputValues.imageUrl,
            description: formState.inputValues.description,
          },
          optimisticResponse: {
            id: prodId,
            title: updatedTitle,
            imageUrl: updatedImage,
            description: updatedDesc,
            ownerId: updatedOwnerId,
            price: updatedPrice,
          },
        })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => console.log(err));

        console.log("queue" + queueLink);
      } else {
        createProduct({
          variables: {
            ownerId: username,
            title: formState.inputValues.title,
            imageUrl: formState.inputValues.imageUrl,
            description: formState.inputValues.description,
            price: +formState.inputValues.price,
          },
          optimisticResponse: {
            id: -1,
            title: formState.inputValues.title,
            imageUrl: formState.inputValues.imageUrl,
            description: formState.inputValues.description,
            ownerId: username,
            price: +formState.inputValues.price,
          },
        })
          .then((result) => console.log(result))
          .catch((err) => {
            console.log("Error" + err);
            setErrorMsg(err.message);
          });
      }
      props.navigation.goBack();
    } catch (err) {
      setErrorMsg(err.message);
    }
    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Save"
              iconName={
                Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
              }
              onPress={submitHandler}
            />
          </HeaderButtons>
        );
      },
    });
  }, [submitHandler]);

  useEffect(() => {
    if (erroMsg !== "") {
      Alert.alert("Error occurred", erroMsg, [{ text: "Okay" }]);
    }
  }, [erroMsg]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      // style={{ flex: 1 }}
      behavior="padding"
      // keyboardVerticalOffset={50}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = (navData: Object) => {
  const submitFn = navData.route.params ? navData.route.params.submit : null;
  return {
    headerTitle: navData.route.params.productId
      ? "Edit Product"
      : "Add Product",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
