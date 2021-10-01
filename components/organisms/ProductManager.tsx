import React, { useEffect, useCallback, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Platform, Alert } from "react-native";

import CustomHeaderButton from "../../components/atoms/CustomHeaderButton";
import AddOrEditProduct from "../molecules/AddOrEditProduct";
import * as productActions from "../../store/actions/productActions";
import { RootState } from "../../App";
import { AnyAction } from "redux";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

type formStateType = {
  inputValues: {
    title: string;
    imageUrl: string;
    description: string;
    price: string;
  };
  inputValidities: {
    title: boolean;
    imageUrl: boolean;
    description: boolean;
    price: boolean;
  };
  formIsValid: boolean;
};

type formDispatchType = {
  type: string;
  value: string;
  isValid: boolean;
  input: string;
};

const formReducer = (
  state: formStateType,
  action: formDispatchType
): formStateType => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      // for (const key in updatedValidities) {
      updatedFormIsValid =
        updatedFormIsValid &&
        updatedValidities["title"] &&
        updatedValidities["imageUrl"] &&
        updatedValidities["description"] &&
        updatedValidities["price"];
      // }

      return {
        formIsValid: updatedFormIsValid,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
      };
  }
  return state;
};

const ProductManager = (props: {
  route: { params: { productId: string } };
  navigation: {
    goBack: () => void;
    setOptions: (arg0: { headerRight: () => JSX.Element }) => void;
  };
}) => {
  let editedProduct: any = null;
  let productId: string;
  productId = "";
  if (props.route.params) {
    productId = props.route.params.productId;
    editedProduct = useSelector((state: RootState) =>
      state.products.userProducts.find((prod: Object) => prod.id === productId)
    );
  }

  const dispatch = useDispatch();

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

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input!", "Please enter valid values", [
        { text: "Okay" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
      // console.log(formState.formIsValid);
    } else {
      dispatch(
        productActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, formState, productId]);

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

  const inputChangeHandler = useCallback(
    (inputIdentifier: string, inputValue: string, inputValidity: boolean) => {
      //  console.log(inputValue);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <AddOrEditProduct
      title={formState.inputValues.title}
      imageUrl={formState.inputValues.imageUrl}
      price={formState.inputValues.price}
      description={formState.inputValues.description}
      edited={editedProduct ? true : false}
      titleValid={formState.inputValidities.title}
      inputChangeHandler={(id: string, value: string, isValid: boolean) =>
        inputChangeHandler(id, value, isValid)
      }
      initialTitleValue={editedProduct ? editedProduct.title : ""}
      initiallyTitleValid={!!editedProduct}
      initialImageValue={editedProduct ? editedProduct.imageUrl : ""}
      initiallyImageValid={!!editedProduct}
      initialDescValue={editedProduct ? editedProduct.description : ""}
      initiallyDescValid={!!editedProduct}
    />
  );
};

export default ProductManager;
