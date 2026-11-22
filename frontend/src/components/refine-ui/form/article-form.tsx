import { useSelect } from "@refinedev/core";
import { useFieldArray, UseFormReturn, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Category } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Autocomplete, Datepicker, Upload } from "../custom";
import { translatedValue } from "@/lib/translations";
import { TranslatedNameFields } from "./translated-name-fields";

export interface ArticleFormValue {
  name?: string;
  translation?: {
    en?: { name?: string; description?: string };
    th?: { name?: string; description?: string };
  };
  categories: Category[];
  description?: string;
  date?: Date;
}

interface ArticleFormProps {
  form: UseFormReturn<ArticleFormValue, unknown>;
  onSubmit: SubmitHandler<ArticleFormValue>;
  isLoading?: boolean;
  submitLabel?: string;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  form,
  onSubmit,
  isLoading = false,
  submitLabel = "Save",
}) => {
  const { t, i18n } = useTranslation();
  const { control, handleSubmit } = form;
  const { append, fields, remove } = useFieldArray({
    name: "categories",
    control,
  });

  const { query: categoryQuery } = useSelect<Category>({
    resource: "category",
    optionValue: "_id",
    pagination: {
      currentPage: 1,
      pageSize: 1000,
    },
  });
  const categoryOptions = (categoryQuery.data?.data || []).map((category) => ({
    value: category._id,
    label: translatedValue(category, "name", i18n.language) || "-",
  }));

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <TranslatedNameFields label={t("gallery.articleName")} />
        {form.watch("name") && <p>{t("general.legacyValue")}: {form.watch("name")}</p>}

        {/* Category */}

        <FormItem>
          <FormLabel>{t("gallery.category")}</FormLabel>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <FormItem key={field.id}>
                <FormField
                  key={field.id}
                  control={control}
                  name={`categories.${index}`}
                  render={({ field: categoryField }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Autocomplete
                            label={""}
                            name={`categories.${index}`}
                            form={form}
                            options={categoryOptions}
                            onChange={categoryField.onChange}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          {t("buttons.delete")}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({} as Category)}
            >
              {t("buttons.add")} {t("gallery.category")}
            </Button>
          </div>
        </FormItem>

        {/* Date */}
        <Datepicker label={t("general.date")} name="date" form={form} />

        {/* Description */}
        {(["en", "th"] as const).map((language) => (
          <FormField
            key={language}
            control={control}
            name={`translation.${language}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("gallery.articleContent")} ({t(language === "en" ? "general.languageEn" : "general.languageTh")})
                </FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value || ""} rows={20} style={{ height: "300px" }} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {form.watch("description") && <p className="whitespace-pre-wrap">{t("general.legacyValue")}: {form.watch("description")}</p>}

        {/* Upload */}
        <Upload name="images" form={form} />
        {/* Submit Buttons */}
        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
