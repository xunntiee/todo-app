import { create } from "zustand";
import { Todo } from "../types/todo";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TodoState {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  addTodo: (title: string, description: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((item) =>
            item.id === id ? { ...item, isDone: !item.isDone } : item,
          ),
        }));
      },
      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((item) => item.id !== id),
        }));
      },
      addTodo: (title: string, description: string) => {
        const newTodo: Todo = {
          id: Date.now().toString(),
          title,
          description,
          isDone: false,
          createdAt: Date.now(),
        };
        set((state) => ({
          todos: [...state.todos, newTodo],
        }));
      },
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
