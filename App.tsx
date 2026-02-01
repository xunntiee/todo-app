import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TodoScreen from "./src/screens/TodoScreen";
import AddTodoScreen from "./src/screens/AddTodoScreen";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
