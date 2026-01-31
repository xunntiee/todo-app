import {
  Alert,
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Todo } from "./src/types/todo";
import { useState } from "react";

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
  const [todos, setTodos] = useState<Todo[]>(mock_data);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const handleDelete = (id: string) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có muốn xóa không?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          style: "destructive",
          onPress: () => {
            setTodos((prev) => prev.filter((item) => item.id !== id));
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item,
      ),
    );
  };

  const handleAddTodo = () => {
    if (!handleValidateTitle()) return;
    const newTodo = {
      id: Date.now().toString(),
      title: title,
      description: desc,
      isDone: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
    setDesc("");
  };

  const handleValidateTitle = () => {
    if (title.trim() === "") {
      Alert.alert("Error", "Title is required");
      return false;
    }
    return true;
  };
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
            <Pressable onPress={() => handleToggle(item.id)}>
              <Text style={{ fontSize: 12 }}>
                Trạng thái: {item.isDone ? "OK" : "Not OK"}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                handleDelete(item.id);
              }}
            >
              <Text>Xóa</Text>
            </Pressable>
          </View>
        )}
      />
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
    marginTop: 10,
    backgroundColor: "white",
  },
  titleDone: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
});
