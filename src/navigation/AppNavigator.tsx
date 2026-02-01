// import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoScreen from "../screens/TodoScreen";
import AddTodoScreen from "../screens/AddTodoScreen";

// export type RootStackParamList = {
//   Todo: undefined;
//   AddTodo: undefined;
// };

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Todo">
      <Stack.Screen
        name="Todo"
        component={TodoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTodo"
        component={AddTodoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
