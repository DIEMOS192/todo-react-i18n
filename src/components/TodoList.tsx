import { useState, useEffect } from "react";
import { useTodoContext } from "../hooks/useTodoContext";
import TodoItem from "./TodoItem";
import type { Todo } from "../types";

export default function TodoList() {
  const { todos } = useTodoContext();
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <ul className="max-w-md mx-auto mt-4">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
