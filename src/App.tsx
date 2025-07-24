import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TodoProvider } from "./contexts";
import Home from "./pages/Home";

function App() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";

    // Update page title based on current language
    document.title = t("pageTitle");
  }, [i18n.language, t]);
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Home />
      </div>
    </TodoProvider>
  );
}

export default App;
