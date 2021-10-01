import * as Notifications from "expo-notifications";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export type productAction = {
  type: string;
  pid: string;
  productData: Object;
};

export const fetchProducts = (products: Object) => {
  return {
    type: SET_PRODUCTS,
    products: products,
  };
};

export const deleteProduct = (productId: string) => {
  return {
    type: DELETE_PRODUCT,
    pid: productId,
  };
};

export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      description,
      imageUrl,
      price,
    },
  };
};

export const updateProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string
) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
