import {
    Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTodoStore } from "../stores/todoStores";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function TodoScreen() {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const confirmDelete = (id: string) => {
    Alert.alert(
        "Xác nhận xóa",
        "Bạn có chắc chắn muốn xóa không?",
        [
            {
                text: "Hủy",
                style: "cancel",
            },
            {
                text: "OK",
                style: "destructive",
                onPress: () => deleteTodo(id),
            }
        ]
    )
  };
  const addTodo = useTodoStore((state) => state.addTodo);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const handleAddTodo = () => {
    if(title.trim() === "") {
        Alert.alert("Lỗi!", "Tiêu đề không được để trống");
        return;
    }
    addTodo(title, desc);
    setTitle("");
    setDesc("");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Danh sách Test</Text>
      <View>
              <TextInput
                value={title}
                onChangeText={setTitle}
                style={style.textInput}
                placeholder="Nhập tiêu đề: ...."
                placeholderTextColor={"red"}
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
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={style.card}>
            <Text style={item.isDone && style.titleDone}>{item.title}</Text>
            <Text style={item.isDone && style.titleDone}>
              {item.description}
            </Text>
            <Pressable onPress={() => toggleTodo(item.id)}>
              <Text style={{ fontSize: 12 }}>
                Trạng thái: {item.isDone ? "OK" : "Not OK"}
              </Text>
            </Pressable>

            <Pressable onPress={() => confirmDelete(item.id)}>
              <Text>Xóa</Text>
            </Pressable>
          </View>
        )}
      />
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
