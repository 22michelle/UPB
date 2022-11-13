import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function FormSubmitButton({ title, submitting, onPress }) {


  return (
    <TouchableOpacity style={[styles.container]} onPress={() => onPress()}>
      <Text style={{ fontSize: 18, color:"white", fontWeight:"bold"}}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D6BFFE",
  },
});