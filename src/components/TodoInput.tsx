import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTodoContext } from "../hooks";

export default function TodoInput() {
  const { t } = useTranslation();
  const { addTodo } = useTodoContext();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      addTodo(trimmed);
      setInputValue("");
    }
  };

  return (
    <form action={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t("addTodoPlaceholder")}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {t("addTodo")}
        </button>
      </div>
    </form>
  );
}
