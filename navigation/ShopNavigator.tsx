import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {createDrawerNavigator} from '@react-navigation/drawer';
import { Platform } from "react-native";
import {Ionicons} from '@expo/vector-icons';

import ProductOverviewScreen, {
  screenOptions as ProductsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen, {
  screenOptions as ProductDetailsScreenOptions,
} from "../screens/shop/ProductDetailsScreen";
import Colors from "../constants/Colors";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen,{screenOptions as OrdersScreenOptions} from "../screens/shop/OrdersScreen";
import UserProductsScreen ,{screenOptions as UserProductsScreenOptions}from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const defaultNavOptions={
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerBackTitleStyle: { fontFamily: "open-sans" },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      }
type ProductStackParamList = {
  ProductsOverview: {};
  ProductDetail: {};
  Cart:{};
};

const ProductsStackNavigator = createStackNavigator<ProductStackParamList>();

const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator
      screenOptions={defaultNavOptions}
    >
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductOverviewScreen}
        options={ProductsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailsScreen}
        options={ProductDetailsScreenOptions}
      />
      <ProductsStackNavigator.Screen name="Cart" component={CartScreen} />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator=createStackNavigator();

const OrdersNavigator=()=>{
  return <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <OrdersStackNavigator.Screen name="Orders" component={OrderScreen} options={OrdersScreenOptions}/>
  </OrdersStackNavigator.Navigator>
}

const AdminStackNavigator=createStackNavigator();

const AdminNavigator=()=>{
  return <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <AdminStackNavigator.Screen name="UserProducts" component={UserProductsScreen} options={UserProductsScreenOptions}/>
    <AdminStackNavigator.Screen name="EditProduct" component={EditProductScreen} />
  </AdminStackNavigator.Navigator>
}

const shopDrawerNavigator=createDrawerNavigator();

export const ShopNavigator=()=>{
  return <shopDrawerNavigator.Navigator screenOptions={defaultDrawerOptions}>
    <shopDrawerNavigator.Screen name="Products" component={ProductsNavigator} options={{drawerIcon:props=>
       <Ionicons name={Platform.OS==='android'?'md-cart':'ios-cart'} size={23} color={props.color}/>}}/>
    <shopDrawerNavigator.Screen name="Order" component={OrdersNavigator} options={{drawerIcon:props=>
       <Ionicons name={Platform.OS==='android'?'md-list':'ios-list'} size={23} color={props.color}/>}}/>
       <shopDrawerNavigator.Screen name="Admin" component={AdminNavigator} options={{drawerIcon:props=>
       <Ionicons name={Platform.OS==='android'?'md-create':'ios-create'} size={23} color={props.color}/>}}/>
  </shopDrawerNavigator.Navigator>
}

const defaultDrawerOptions={
        drawerActiveTintColor: Colors.primary,
        headerShown:false
}