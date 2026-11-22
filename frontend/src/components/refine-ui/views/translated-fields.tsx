import { useTranslation } from "react-i18next";
import { PersonLanguage } from "@/lib/translations";

type TranslationFields = {
  name?: string;
  description?: string;
  calledName?: string;
  nickname?: string;
};

export function TranslatedFields({
  record,
  fields,
  japanese = false,
}: {
  record?: TranslationFields & { translation?: Partial<Record<PersonLanguage, TranslationFields>> };
  fields: Array<{ key: keyof TranslationFields; label: string }>;
  japanese?: boolean;
}) {
  const { t } = useTranslation();
  const languages: PersonLanguage[] = japanese ? ["en", "th", "ja"] : ["en", "th"];
  return (
    <div className="space-y-4">
      {languages.map((language) => (
        <div key={language}>
          <h4 className="text-sm font-semibold mb-2">
            {t(language === "en" ? "general.languageEn" : language === "th" ? "general.languageTh" : "general.languageJa")}
          </h4>
          {fields.map(({ key, label }) => (
            <div key={key} className="text-sm mb-2">
              <span className="font-medium">{label}: </span>
              <span className="text-muted-foreground whitespace-pre-wrap">{record?.translation?.[language]?.[key] || "-"}</span>
            </div>
          ))}
        </div>
      ))}
      {fields.some(({ key }) => record?.[key]) && (
        <div>
          <h4 className="text-sm font-semibold mb-2">{t("general.legacyValue")}</h4>
          {fields.filter(({ key }) => record?.[key]).map(({ key, label }) => (
            <p key={key} className="text-sm whitespace-pre-wrap">
              <span className="font-medium">{label}: </span>{record?.[key]}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
