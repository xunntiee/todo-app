import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTodoStore } from "../stores/todoStores";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function AddTodoScreen() {
  const navigation = useNavigation();
  const addTodo = useTodoStore((state) => state.addTodo);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const handleAddTodo = () => {
    if (title.trim() === "") {
      Alert.alert("Lỗi!", "Tiêu đề không được để trống");
      return;
    }
    addTodo(title, desc);
    setTitle("");
    setDesc("");
    navigation.goBack();
  }; 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={style.textInput}
          placeholder="Nhập tiêu đề: ...."
          placeholderTextColor={"red"}
          autoFocus
        />
        <TextInput
          value={desc}
          onChangeText={setDesc}
          style={style.textInput}
          placeholder="Nhập mô tả: ...."
          placeholderTextColor={"red"}
        />
        <Pressable onPress={handleAddTodo}>
          <Text>Thêm</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
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
    marginTop: 10,
    backgroundColor: "white",
  },
  titleDone: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
});
