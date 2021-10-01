import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ProductDetail = (props: Object) => {
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: props.data.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={props.onAddToCart}
        />
      </View>

      <Text style={styles.price}>${props.data.price.toFixed(2)}</Text>
      <Text style={styles.description}>{props.data.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetail;
