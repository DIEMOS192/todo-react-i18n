import { useTodoContext } from "../hooks";
import TodoItem from "./TodoItem";
import type { Todo } from "../types";

interface TodoListProps {
  todos?: Todo[];
}

export default function TodoList({ todos: propTodos }: TodoListProps) {
  const { todos: contextTodos } = useTodoContext();
  const todos = propTodos || contextTodos;

  if (todos.length === 0) return null;

  return (
    <ul className="w-full space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
