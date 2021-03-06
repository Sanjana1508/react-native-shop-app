import { AnyAction } from "redux";
import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import { allProductsOverview } from "../../screens/shop/ProductsOverviewScreen";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/productActions";
import { productAction } from "../actions/productActions";

export type product = {
  availableProducts: [Object];
  userProducts: [Object];
};

console.log(allProductsOverview);

const initialState = {
  availableProducts: allProductsOverview,
  userProducts: allProductsOverview,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        userProducts: action.products,
      };

    // case CREATE_PRODUCT:
    //   const newProduct = new Product(
    //     new Date().toString(),
    //     "u1",
    //     action.productData.title,
    //     action.productData.imageUrl,
    //     action.productData.description,
    //     action.productData.price
    //   );
    //   return {
    //     ...state,
    //     availableProducts: state.availableProducts.concat(newProduct),
    //     userProducts: state.userProducts.concat(newProduct),
    //   };
    // case UPDATE_PRODUCT:
    //   const productIndex = state.userProducts.findIndex(
    //     (prod: Product) => prod.id === action.pid
    //   );
    //   // console.log(action.productData);
    //   const updatedProduct = new Product(
    //     action.pid,
    //     state.userProducts[productIndex].ownerId,
    //     action.productData.title,
    //     action.productData.imageUrl,
    //     action.productData.description,
    //     state.userProducts[productIndex].price
    //   );
    //   const updatedUserProducts = [...state.userProducts];
    //   updatedUserProducts[productIndex] = updatedProduct;
    //   const availableProductIndex = state.availableProducts.findIndex(
    //     (prod: Product) => prod.id === action.pid
    //   );
    //   const updatedAvailableProducts = [...state.availableProducts];
    //   updatedAvailableProducts[availableProductIndex] = updatedProduct;
    //   return {
    //     ...state,
    //     availableProducts: updatedAvailableProducts,
    //     userProducts: updatedUserProducts,
    //   };
    // case DELETE_PRODUCT:
    //   return {
    //     ...state,
    //     userProducts: state.userProducts.filter(
    //       (product: Product) => product.id != action.pid
    //     ),
    //     availableProducts: state.availableProducts.filter(
    //       (product: Product) => product.id != action.pid
    //     ),
    //   };
    default:
      return state;
  }
};
