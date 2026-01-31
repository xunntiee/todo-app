import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Todo } from "./src/types/todo";

const mock_data: Todo[] = [
  {
    id: "1",
    title: "Todo 1",
    description: "abc",
    isDone: false,
    createdAt: 123456789,
  },
  {
    id: "2",
    title: "Todo tile",
    isDone: true,
    createdAt: 123456789,
  },
  {
    id: "3",
    title: "Todo 3",
    isDone: false,
    createdAt: 123456789,
  },
];
export default function Test() {
  return (
    // <Pressable onPress={() => {
    //     return alert("Hello")
    // }}>
    //     <Text>Press me</Text>
    // </Pressable>
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable onPress={() => alert("Hello")}>
        <Text style={style.test}>Press me</Text>
        {/* Button tự xử lý sự kiện onPress nên không thể dùng Pressable để bọc Button */}
        {/* <Button title="Click me" />  */}
      </Pressable>

      <Button title="Click me" onPress={() => alert("Hello")} />

      <TextInput
        style={style.textInput}
        // onChangeText={() => alert("Test onChange")}
        placeholder="Nhập: ...."
        placeholderTextColor={"red"}
      />
      <ScrollView>
        {mock_data.map((todo) => (
          <View style={style.card} key={todo.id}>
            <Text>{todo.title}</Text>
            <Text style={{ fontSize: 12 }}>
              Trạng thái: {todo.isDone ? "OK" : "Not OK"}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  test: {
    color: "red",
  },
  textInput: {
    // flex: 1,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "black",
    // justifyContent: "center",
    // alignItems: "center",
  },
  card: {
    padding: 5,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "black",
    margin: 10,
  },
  
});
