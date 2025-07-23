import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TodoProvider } from "./contexts/TodoContext";
import Home from "./pages/Home";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Home />
      </div>
    </TodoProvider>
  );
}

export default App;
