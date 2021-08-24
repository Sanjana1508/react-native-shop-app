import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";

import { Colors } from "../../constants/Colors";

const CartSummary = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${props.total.toFixed(2)}</Text>
        </Text>
        <Button
          color="#8a3382"
          title="Order Now"
          disabled={props.data.length === 0}
          onPress={props.onOrder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    //  color: Colors.primary,
  },
});

export default CartSummary;
