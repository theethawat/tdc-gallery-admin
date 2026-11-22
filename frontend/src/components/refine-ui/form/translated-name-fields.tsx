import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function TranslatedNameFields({ label }: { label: string }) {
  const { t } = useTranslation();
  const { control, getValues } = useFormContext();

  return (
    <>
      {(["en", "th"] as const).map((language) => (
        <FormField
          key={language}
          control={control}
          name={`translation.${language}.name`}
          rules={language === "en" ? {
            validate: (value) =>
              Boolean(value?.trim() || getValues("translation.th.name")?.trim() || getValues("name")?.trim())
              || t("general.nameRequired"),
          } : undefined}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {label} ({t(language === "en" ? "general.languageEn" : "general.languageTh")})
              </FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
}
