import React from "react";
import {
  HeaderButton,
  HeaderButtonProps,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import Colors from "../../constants/Colors";

const CustomHeaderButton = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<HeaderButton> &
    Readonly<HeaderButtonProps> &
    Readonly<{ children?: React.ReactNode }>
) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
