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
          rules={{ required: t("gallery.articleName") + " is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("gallery.articleName")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder={`Enter ${t(
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
              <FormField
                key={field.id}
                control={control}
                name={`categories.${index}`}
                render={({ field: categoryField }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Select
                          onValueChange={categoryField.onChange}
                          value={
                            typeof categoryField.value === "string"
                              ? categoryField.value
                              : (categoryField.value as Category)?._id || ""
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoryOptions?.map((option) => (
                              <SelectItem
                                key={String(option.value)}
                                value={String(option.value)}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({} as Category)}
            >
              Add Category
            </Button>
          </div>
        </FormItem>

        {/* Description */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Enter article description"
                  rows={10}
                />
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
