import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import Input from "../atoms/Input";

const AddOrEditProduct = (props: Object) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="Title"
            label="Title"
            errorText="Please enter valid title"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={(id: string, value: string, isValid: boolean) =>
              props.inputChangeHandler(id, value, isValid)
            }
            initialValue={props.initialTitleValue}
            initiallyValid={props.initiallyTitleValid}
            required
          />
          <Input
            id="image Url"
            label="Image Url"
            errorText="Please enter valid image url"
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={(id: string, value: string, isValid: boolean) =>
              props.inputChangeHandler(id, value, isValid)
            }
            initialValue={props.initialImageValue}
            initiallyValid={props.initiallyImageValid}
            required
          />
          {props.edited === true ? null : (
            <Input
              id="Price"
              label="Price"
              errorText="Please enter valid price"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={(id: string, value: string, isValid: boolean) =>
                props.inputChangeHandler(id, value, isValid)
              }
              required
              min={0.1}
            />
          )}
          <Input
            id="Description"
            label="Description"
            errorText="Please enter valid description"
            keyboardType="default"
            autoCapitalize="sentences"
            onInputChange={(id: string, value: string, isValid: boolean) =>
              props.inputChangeHandler(id, value, isValid)
            }
            autoCorrect
            multiline
            numberOfLines={3}
            initialValue={props.initialDescValue}
            initiallyValid={props.initiallyDescValid}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default AddOrEditProduct;
