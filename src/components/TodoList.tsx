import { useTodoContext } from "../hooks";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos } = useTodoContext();

  return (
    <ul className="max-w-md mx-auto mt-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
