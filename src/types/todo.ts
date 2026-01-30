export interface Todo {
    id: string;
    title: string;
    description?: string;
    isDone: boolean;
    createdAt: number;
}

// export default Todo; -> chỉ type chính trong file
