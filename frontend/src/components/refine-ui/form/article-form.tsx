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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Autocomplete } from "../custom";

export interface ArticleFormValue {
  name: string;
  categories: Category[];
  description: string;
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
  const { t } = useTranslation();
  const { control, handleSubmit } = form;
  const { append, fields, remove } = useFieldArray({
    name: "categories",
    control,
  });

  const { options: categoryOptions } = useSelect({
    resource: "category",
    optionLabel: "name",
    optionValue: "_id",
    pagination: {
      currentPage: 1,
      pageSize: 1000,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Article Name */}
        <FormField
          control={control}
          name="name"
          rules={{
            required: t("gallery.articleName") + " " + t("general.isRequired"),
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("gallery.articleName")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder={`${t("buttons.enter")}${t(
                    "gallery.articleName",
                  )?.toLowerCase()}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {/* Description */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("gallery.articleContent")}</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ""} rows={20} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
