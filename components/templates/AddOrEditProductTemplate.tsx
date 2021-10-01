import React from "react";

import ProductManager from "../organisms/ProductManager";

const AddOrEditProductTemplate = (props: {
  route: { params: { productId: string } };
  navigation: {
    goBack: () => void;
    setOptions: (arg0: { headerRight: () => JSX.Element }) => void;
  };
}) => {
  return <ProductManager route={props.route} navigation={props.navigation} />;
};

export default AddOrEditProductTemplate;
