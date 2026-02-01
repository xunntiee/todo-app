import {
  Alert,
  KeyboardAvoidingView,
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
import { X } from "lucide-react-native";

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
    <SafeAreaView style={style.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={style.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <X style={{marginLeft: 10}} color="white" size={25} />
          </Pressable>
          <Text style={style.headerTitle}>Thêm mới Todo</Text>
          <View style={style.headerRight} />
        </View>

        <View>
          <Text style={style.textInputTitle}>
            Task Title <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={[style.textInput, style.textAreaTitle]}
            placeholder="What needs to be done?"
            placeholderTextColor={"gray"}
            autoFocus
          />

          <Text style={style.textInputTitle}>
            Description{" "}
            <Text style={{ color: "gray", fontSize: 16 }}> (Optional) </Text>
          </Text>
          <TextInput
            value={desc}
            onChangeText={setDesc}
            style={[style.textInput, style.textAreaDesc]}
            placeholder="Add details about your task..."
            placeholderTextColor={"gray"}
          />
        </View>
        <Pressable style={style.createBtn} onPress={handleAddTodo}>
          <Text style={style.createText}>Create Todo</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(1, 37, 13, 1)",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },

  headerRight: {
    width: 25,
    alignItems: "flex-start",
  },

  textInput: {
    margin: 10,
    backgroundColor: "rgba(20, 60, 40, 0.7)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "white",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  textAreaTitle: {
    height: 80,
  },

  textAreaDesc: {
    height: 180,
  },

  textInputTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: 500,
    marginTop: 10,
    marginHorizontal: 10,
  },

  createBtn: {
    marginTop: "auto",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28ff6a",
    marginHorizontal: 10,
  },

  createText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
