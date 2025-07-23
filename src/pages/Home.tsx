import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t("welcome")}</h1>
      <p>This is a simple home page component.</p>
    </div>
  );
}
