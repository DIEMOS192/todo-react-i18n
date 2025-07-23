import { useCallback, useMemo } from "react";
import type { Todo } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export function useTodos(initialTodos: Todo[] = []) {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", initialTodos);

  // Memoized callbacks for better performance
  const addTodo = useCallback(
    (text: string) => {
      const trimmedText = text.trim();
      if (!trimmedText) return; // Don't add empty todos

      const now = new Date();
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: trimmedText,
        completed: false,
        createdAt: now,
        updatedAt: now,
      };
      setTodos((prev) => [...prev, newTodo]);
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
            : todo
        )
      );
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    },
    [setTodos]
  );

  const updateTodo = useCallback(
    (id: string, newText: string) => {
      const trimmedText = newText.trim();
      if (!trimmedText) return; // Don't update to empty text

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? { ...todo, text: trimmedText, updatedAt: new Date() }
            : todo
        )
      );
    },
    [setTodos]
  );

  // Additional utility functions
  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, [setTodos]);

  const toggleAll = useCallback(() => {
    setTodos((prev) => {
      const allCompleted = prev.every((todo) => todo.completed);
      return prev.map((todo) => ({ ...todo, completed: !allCompleted }));
    });
  }, [setTodos]);

  // Memoized computed values
  const stats = useMemo(
    () => ({
      total: todos.length,
      completed: todos.filter((todo) => todo.completed).length,
      pending: todos.filter((todo) => !todo.completed).length,
      allCompleted: todos.length > 0 && todos.every((todo) => todo.completed),
      hasCompleted: todos.some((todo) => todo.completed),
    }),
    [todos]
  );

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    toggleAll,
    stats,
  };
}
