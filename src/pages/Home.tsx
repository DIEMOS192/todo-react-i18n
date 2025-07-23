import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components";
import { useTodoContext } from "../hooks";

export default function Home() {
  const { t } = useTranslation();
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodoContext();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Language Switcher */}
      <div className="absolute top-4 ltr:right-4 rtl:left-4">
        <LanguageSwitcher />
      </div>

      {/* Centered content container */}
      <div className="w-full max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold">{t("welcome")}</h1>
        <p className="text-lg text-gray-700">{t("description")}</p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          {t("cta")}
        </button>
      </div>
    </main>
  );
}
