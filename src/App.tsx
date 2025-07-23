import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Home from "./pages/Home";
import { LanguageSwitcher } from "./components";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 text-left rtl :text-right">
      <Home />
      <LanguageSwitcher />
    </div>
  );
}

export default App;
