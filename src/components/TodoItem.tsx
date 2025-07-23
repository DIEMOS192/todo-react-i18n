import { useState } from "react";
import { useTodoContext } from "../hooks";
import type { Todo } from "../types";
import { useTranslation } from "react-i18next";


interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { t } = useTranslation();
  const { toggleTodo, deleteTodo, updateTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = () => {
    const trimmed = editText.trim();
    if (trimmed) {
      updateTodo(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-3 bg-white border rounded shadow-sm mb-2">
      <div className="flex items-center gap-3 w-full">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="w-4 h-4"
        />

        {isEditing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
              if (e.key === "Escape") {
                setIsEditing(false);
                setEditText(todo.text);
              }
            }}
            className="flex-1 border p-1 rounded"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={`flex-1 cursor-pointer ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700 transition text-sm"
        title={t("delete")}
      >
        ✕
      </button>
    </li>
  );
}
