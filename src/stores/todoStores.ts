import { create } from "zustand";
import { Todo } from "../types/todo";

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
    title: "Todo 2",
    isDone: true,
    createdAt: 123456789,
  },
];
interface TodoState {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  addTodo: (title: string, description: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: mock_data,
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
        createdAt: Date.now()
    }
    set((state) => ({
        todos: [...state.todos, newTodo]
    }))
  }
}));
