import {
  Alert,
  FlatList,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTodoStore } from "../stores/todoStores";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckCircle2, Circle, List, Menu, Plus, Search, Trash2 } from "lucide-react-native";
import { useMemo, useState } from "react";

type Filter = "all" | "active" | "done";

export default function TodoScreen({ navigation }: any) {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const [filter, setFilter] = useState<Filter>("all");

  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.isDone);
    if (filter === "done") return todos.filter((t) => t.isDone);
    return todos;
  }, [todos, filter]);

  const sections = useMemo(() => {
    if (filter !== "all") {
      return [
        {
          title: filter === "active" ? "Active Tasks" : "Done",
          data: filteredTodos,
        }
      ]
    }
    return [
      { title: "Today", data: todos.filter((t) => !t.isDone) },
      { title: "Done", data: todos.filter((t) => t.isDone) },
    ];
  }, [todos, filter, filteredTodos]);

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

  const count = useMemo(() => {
    const total = todos.length;
    const done = todos.filter((t) => t.isDone).length;
    return { total, done };
  }, [todos]);

  const emptyList = () => (
    <View style={style.empty}>
      <Text style={style.emptyTitle}>Không có dữ liệu</Text>
      <Text style={style.emptyText}>Ấn nút + để thêm</Text>
    </View>
  );
  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <Pressable hitSlop={10}>
          <Menu color="white" size={24} />
        </Pressable>
        <Text style={style.headerTitle}>My Tasks</Text>
        <Pressable hitSlop={10}>
          <Search color="white" size={24} />
        </Pressable>
      </View>
      <View style={style.filterBar}>
        <Pressable
          style={[
            style.filterButton,
            filter === "all" && style.filterButtonActive,
          ]}
          onPress={() => setFilter("all")}
        >
          <List size={18} color={filter === "all" ? "#0D1511" : "#fff"} />
          <Text
            style={[
              style.filterText,
              filter === "all" && style.filterTextActive,
            ]}
          >
            All
          </Text>
        </Pressable>
        <Pressable
          style={[
            style.filterButton,
            filter === "active" && style.filterButtonActive,
          ]}
          onPress={() => setFilter("active")}
        >
          <Circle size={18} color={filter === "active" ? "#0D1511" : "#fff"} />
          <Text
            style={[
              style.filterText,
              filter === "active" && style.filterTextActive,
            ]}
          >
            Active
          </Text>
        </Pressable>
        <Pressable
          style={[
            style.filterButton,
            filter === "done" && style.filterButtonActive,
          ]}
          onPress={() => setFilter("done")}
        >
          <CheckCircle2
            size={18}
            color={filter === "done" ? "#0D1511" : "#fff"}
          />
          <Text
            style={[
              style.filterText,
              filter === "done" && style.filterTextActive,
            ]}
          >
            Done
          </Text>
        </Pressable>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={emptyList}
        renderItem={({ item }) => (
          <View style={style.todoCard}>
            {/* Trái */}
            <Pressable style={style.left} onPress={() => toggleTodo(item.id)}>
              <CheckCircle2
                color={item.isDone ? "#3bf88aff" : "gray"}
                size={35}
              />
            </Pressable>
            {/* Giữa */}
            <View style={style.center}>
              <Text style={[style.title, item.isDone && style.titleDone]}>
                {item.title}
              </Text>
              {!!item.description && (
                <Text
                  style={[
                    style.description,
                    item.isDone && style.descriptionDone,
                  ]}
                >
                  {item.description}
                </Text>
              )}
            </View>

            {/* Phải */}
            <Pressable
              style={style.right}
              hitSlop={10}
              onPress={() => confirmDelete(item.id)}
            >
              <Text>
                <Trash2 color="white" size={30} />
              </Text>
            </Pressable>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <Text style={style.today}>{section.title}</Text>
            {section.title === "Today" && (
              <Text style={style.countTodo}>
                {count.total} Tasks • {count.done} Completed
              </Text>
            )}
          </View>
        )}
      />
      <Pressable
        style={style.fab}
        onPress={() => navigation.navigate("AddTodo")}
      >
        <Text style={{ fontSize: 35 }}>
          <Plus color="white" size={35} />
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(1, 37, 13, 1)",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  filterBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(32, 158, 28, 0.1)",
  },

  filterButtonActive: {
    backgroundColor: "rgba(70, 227, 78, 0.88)",
  },
  filterText: {
    color: "white",
    fontSize: 19,
    fontWeight: "500",
  },

  filterTextActive: {
    color: "black",
  },

  today: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
    marginLeft: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },

  countTodo: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },

  todoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#123A2A",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: "#0f5e30ff",
    elevation: 4,
  },

  left: {
    marginLeft: 10,
  },

  center: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 8,
  },

  right: {
    marginRight: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  description: {
    fontSize: 16,
    color: "white",
  },

  titleDone: {
    fontSize: 20,
    textDecorationLine: "line-through",
    opacity: 0.5,
  },

  descriptionDone: {
    textDecorationLine: "line-through",
    opacity: 0.4,
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  emptyTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },

  emptyText: {
    fontSize: 22,
    color: "gray",
  },

  fab: {
    position: "absolute",
    backgroundColor: "lightgreen",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    right: 50,
  },
});
