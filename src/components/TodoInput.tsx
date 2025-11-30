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
    <form action={handleSubmit} className="w-full relative">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t("addTodoPlaceholder")}
            className="w-full px-5 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-sm hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 active:scale-95"
        >
          {t("addTodo")}
        </button>
      </div>
    </form>
  );
}
