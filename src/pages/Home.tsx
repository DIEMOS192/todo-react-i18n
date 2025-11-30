import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LanguageSwitcher,
  ThemeSwitcher,
  TodoList,
  TodoInput,
} from "../components";
import { useTodoContext } from "../hooks";
import type { FilterType } from "../types";

export default function Home() {
  const { t } = useTranslation();
  const { todos, clearCompleted, stats } = useTodoContext();
  const [showTodos, setShowTodos] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");

  const handleGetStarted = () => {
    setShowTodos(true);
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300">
      {/* Header Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>

      {!showTodos ? (
        /* Landing Page */
        <div className="w-full max-w-2xl text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 pb-2">
            {t("welcome")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
            {t("description")}
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {t("cta")}
          </button>
        </div>
      ) : (
        /* Todo App */
        <div className="w-full max-w-2xl space-y-8 animate-fade-in-up">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {t("todoList")}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {t("itemsLeft", { count: stats.pending })}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 space-y-6 border border-gray-100 dark:border-gray-700">
            <TodoInput />

            {/* Filters & Actions */}
            {todos.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-gray-100 dark:border-gray-700 pb-4">
                <div className="flex gap-1 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
                  {(["all", "active", "completed"] as FilterType[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                        filter === f
                          ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      }`}
                    >
                      {t(f)}
                    </button>
                  ))}
                </div>

                {stats.completed > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
                  >
                    {t("clearCompleted")}
                  </button>
                )}
              </div>
            )}

            <TodoList todos={filteredTodos} />

            {todos.length === 0 && (
              <div className="text-center py-10 text-gray-400 dark:text-gray-500">
                <p>{t("noTodos")}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
