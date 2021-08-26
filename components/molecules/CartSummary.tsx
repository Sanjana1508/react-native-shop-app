import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";

import Card from "../atoms/Card";

const CartSummary = (props: Object) => {
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(props.total.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          color="#8a3382"
          title="Order Now"
          disabled={props.data.length === 0}
          onPress={props.onOrder}
        />
      </Card>
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
