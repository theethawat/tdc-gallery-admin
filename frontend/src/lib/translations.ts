export type ContentLanguage = "en" | "th";
export type PersonLanguage = ContentLanguage | "ja";

type TranslatedRecord = {
  translation?: Partial<Record<PersonLanguage, {
    name?: string;
    description?: string;
    nickname?: string;
    calledName?: string;
  }>>;
  name?: string;
  description?: string;
  nickname?: string;
  calledName?: string;
};

export function contentLanguage(language: string): ContentLanguage {
  return language.toLowerCase().startsWith("th") ? "th" : "en";
}

export function translatedValue(
  record: TranslatedRecord | null | undefined,
  field: "name" | "description" | "nickname" | "calledName",
  language: string,
): string {
  const selected = contentLanguage(language);
  const other = selected === "en" ? "th" : "en";
  return record?.translation?.[selected]?.[field]
    || record?.[field]
    || record?.translation?.[other]?.[field]
    || record?.translation?.ja?.[field]
    || "";
}
