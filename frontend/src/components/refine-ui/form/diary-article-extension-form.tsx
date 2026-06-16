import { useSelect } from "@refinedev/core";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Autocomplete } from "../custom";
import { Button } from "@/components/ui/button";
import {
  FormItem,
  FormLabel,
  Form,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { ArticleFormValue } from "./article-form";
import { People } from "@/types";

export interface DiaryArticleExtensionValue {
  gallery?: string;
  withs?: People[];
}

interface DiaryArticleExtensionFormProps {
  form: UseFormReturn<ArticleFormValue & DiaryArticleExtensionValue, unknown>;
}

export const DiaryArticleExtensionForm: React.FC<
  DiaryArticleExtensionFormProps
> = ({ form }) => {
  const { t } = useTranslation();
  const { control } = form;
  const { append, fields, remove } = useFieldArray({
    name: "withs",
    control,
  });

  const { options: galleryOptions } = useSelect({
    resource: "gallery-article",
    optionLabel: "name",
    optionValue: "_id",
    pagination: {
      currentPage: 1,
      pageSize: 1000,
    },
  });

  const { options: peopleOptions } = useSelect({
    resource: "people",
    optionLabel: "name",
    optionValue: "_id",
    pagination: {
      currentPage: 1,
      pageSize: 1000,
    },
  });
  console.log("People Options:", peopleOptions);
  return (
    <Form {...form}>
      <div className="space-y-8 mt-8">
        {/* <Autocomplete
        form={form}
        label={t("gallery.article")}
        name="gallery"
        options={galleryOptions}
      /> */}

        <FormItem>
          <FormLabel>{t("relation.people")}</FormLabel>

          <div className="space-y-2">
            {fields?.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <div className="flex-1">
                  <FormField
                    key={field.id}
                    control={control}
                    name={`withs.${index}`}
                    render={({ field: peopleField }) => (
                      <FormItem>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Autocomplete
                              label={""}
                              name={peopleField.name}
                              form={form}
                              options={peopleOptions}
                              onChange={peopleField.onChange}
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
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({} as People)}
            >
              {t("buttons.add")} {t("relation.people")}
            </Button>
          </div>
        </FormItem>
      </div>
    </Form>
  );
};
