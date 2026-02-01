import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTodoStore } from "../stores/todoStores";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TodoScreen({ navigation }: any) {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const confirmDelete = (id: string) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa không?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: () => deleteTodo(id),
      },
    ]);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      <Pressable style={style.fab} onPress={() => navigation.navigate("AddTodo")}>
        <Text style={{ fontSize: 35 }}>+</Text>
      </Pressable>
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
  fab: {
    position: "absolute",
    backgroundColor: "lightgreen",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 20,
  }
});
