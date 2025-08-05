import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher, TodoList, TodoInput } from "../components";
import { useTodoContext } from "../hooks";

export default function Home() {
  const { t } = useTranslation();
  const { todos } = useTodoContext();
  const [showTodos, setShowTodos] = useState(false);

  const handleGetStarted = () => {
    setShowTodos(true);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      {!showTodos ? (
        /* Landing Page */
        <div className="w-full max-w-2xl text-center space-y-6">
          <h1 className="text-4xl font-bold">{t("welcome")}</h1>
          <p className="text-lg text-gray-700">{t("description")}</p>
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            {t("cta")}
          </button>
        </div>
      ) : (
        /* Todo App */
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">{t("todoList")}</h1>
            <p className="text-gray-600 mb-6">
              {todos.length === 0
                ? t("noTodos")
                : `${todos.length > 1 ? todos.length : ""} ${
                    todos.length === 1 ? t("one_task") : t("num_tasks")
                  }`}
            </p>
          </div>

          <TodoInput />
          <TodoList />
        </div>
      )}
    </main>
  );
}
