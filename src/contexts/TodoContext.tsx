import { createContext } from "react";
import { useTodos } from "../hooks/useTodos";

// Get the return type from useTodos hook
type TodoContextType = ReturnType<typeof useTodos>;

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const todoMethods = useTodos();

  return (
    <TodoContext.Provider value={todoMethods}>{children}</TodoContext.Provider>
  );
};

export { TodoContext };
