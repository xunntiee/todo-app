import {
  Alert,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTodoStore } from "../stores/todoStores";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CheckCircle2,
  Plus,
  Trash2,
  Menu,
  Search,
  List,
  Circle,
} from "lucide-react-native";
import { useMemo, useState } from "react";

type Filter = "all" | "active" | "done";

export default function TodoScreenCopy({ navigation }: any) {
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
          title: filter === "active" ? "Active Tasks" : "Completed",
          data: filteredTodos,
        },
      ];
    }
    return [
      { title: "Today, Oct 24", data: todos.filter((t) => !t.isDone) },
      { title: "Done", data: todos.filter((t) => t.isDone) },
    ];
  }, [todos, filter, filteredTodos]);

  const confirmDelete = (id: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteTodo(id) },
      ],
    );
  };

  const count = useMemo(() => {
    const total = todos.length;
    const active = todos.filter((t) => !t.isDone).length;
    const done = todos.filter((t) => t.isDone).length;
    return { total, active, done };
  }, [todos]);

  const emptyList = () => (
    <View style={style.empty}>
      <Text style={style.emptyTitle}>No tasks yet</Text>
      <Text style={style.emptyText}>Tap + to add a new task</Text>
    </View>
  );

  return (
    <SafeAreaView style={style.container}>
      {/* Header */}
      <View style={style.header}>
        <Pressable hitSlop={10}>
          <Menu color="white" size={24} />
        </Pressable>
        <Text style={style.headerTitle}>My Tasks</Text>
        <Pressable hitSlop={10}>
          <Search color="white" size={24} />
        </Pressable>
      </View>

      {/* Filter Bar */}
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
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={style.todoCard}>
            <Pressable style={style.left} onPress={() => toggleTodo(item.id)}>
              {item.isDone ? (
                <CheckCircle2 color="#2ECC71" size={24} />
              ) : (
                <Circle color="#2ECC71" size={24} />
              )}
            </Pressable>

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

            <Pressable
              style={style.right}
              hitSlop={10}
              onPress={() => confirmDelete(item.id)}
            >
              <Trash2 color="#4A554F" size={20} />
            </Pressable>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={style.sectionHeader}>
            <Text style={style.sectionTitle}>{section.title}</Text>
            {(section.title.includes("Today") ||
              section.title === "Active Tasks") && (
              <Text style={style.sectionSubtitle}>
                {count.active} tasks • {count.done} completed
              </Text>
            )}
          </View>
        )}
      />

      <Pressable
        style={style.fab}
        onPress={() => navigation.navigate("AddTodo")}
      >
        <Plus color="#0D1511" size={32} />
      </Pressable>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1511",
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
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A261F",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  filterButtonActive: {
    backgroundColor: "#2ECC71",
  },
  filterText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#0D1511",
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
  },
  sectionTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  sectionSubtitle: {
    color: "#8E9791",
    fontSize: 14,
    marginTop: 4,
  },
  todoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A261F",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  left: {
    marginRight: 12,
  },
  center: {
    flex: 1,
  },
  right: {
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: "#8E9791",
  },
  titleDone: {
    textDecorationLine: "line-through",
    color: "#8E9791",
  },
  descriptionDone: {
    textDecorationLine: "line-through",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#8E9791",
  },
  fab: {
    position: "absolute",
    backgroundColor: "#2ECC71",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    right: 30,
    elevation: 8,
    shadowColor: "#2ECC71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
