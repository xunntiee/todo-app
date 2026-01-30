import { Button, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    </SafeAreaView>
  );
  
}

const style = StyleSheet.create({
  test: {
    color: "red",
  },
});
