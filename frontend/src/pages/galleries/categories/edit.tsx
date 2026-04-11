import { useSelect, useOne, useResourceParams } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { EditView, ListViewHeader } from "@/components/refine-ui/views";
import { Autocomplete } from "@/components/refine-ui";
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

import { Category } from "@/types";
import { useTranslation } from "react-i18next";

type CategoryFormValues = {
  name: string;
  place: string;
};

export const CategoryEdit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useResourceParams();
  const { result: record } = useOne({ resource: "category", id });

  const {
    refineCore: { onFinish, query },
    setValue,
    ...form
  } = useForm<CategoryFormValues>({
    refineCoreProps: {
      resource: "category",
      action: "edit",
      id,
      redirect: "list",
    },
    defaultValues: { ...record, place: record?.place?._id || "" },
  });

  const categoryData = query?.data?.data as Category | undefined;

  const { options: placeOptions } = useSelect({
    resource: "place",
    optionLabel: "name",
    optionValue: "_id",
    defaultValue: categoryData?.place?._id,
    queryOptions: {
      enabled: true,
    },
    pagination: {
      currentPage: 1,
      pageSize: 1000,
    },
  });

  useEffect(() => {
    if (categoryData?.place?._id) {
      const selectedPlaceId = categoryData?.place?._id;
      setValue("place", selectedPlaceId);
    }
  }, [categoryData, setValue]);

  useEffect(() => {
    if (record) {
      setValue("name", record.name);
    }

    return () => {};
  }, [record]);

  function onSubmit(values: CategoryFormValues) {
    onFinish({
      name: values.name,
      place: values.place,
    });
  }

  return (
    <EditView>
      <ListViewHeader
        resource="categories"
        title={t("gallery.categoryEdit")}
        canCreate={false}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Autocomplete
            form={{ ...form, setValue }}
            label={t("gallery.place")}
            name="place"
            options={placeOptions}
            required
          />

          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Category name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="Enter category name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button
              type="submit"
              {...form.saveButtonProps}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? t("buttons.updating")
                : t("buttons.update")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              {t("buttons.cancel")}
            </Button>
          </div>
        </form>
      </Form>
    </EditView>
  );
};
