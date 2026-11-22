import { HttpError, useSelect, useResourceParams } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import { EditView, ListViewHeader } from "@/components/refine-ui/views";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Category, Place } from "@/types";
import { useTranslation } from "react-i18next";
import { translatedValue } from "@/lib/translations";
import { TranslatedNameFields } from "@/components/refine-ui/form/translated-name-fields";

type CategoryFormValues = {
  name?: string;
  translation?: Category["translation"];
  place: string | Place;
};

export const CategoryEdit = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { id } = useResourceParams();
  const {
    refineCore: { onFinish, query },
    ...form
  } = useForm<Category, HttpError, CategoryFormValues>({
    refineCoreProps: {
      resource: "category",
      action: "edit",
      id,
      redirect: "list",
    },
  });

  const { query: placeQuery } = useSelect<Place>({
    resource: "place",
    optionValue: "_id",
    queryOptions: {
      enabled: true,
    },
    pagination: {
      currentPage: 1,
      pageSize: 1000,
    },
  });
  const places = placeQuery.data?.data || [];
  const selectedPlace = query?.data?.data?.place;
  const availablePlaces = selectedPlace && !places.some((place) => place._id === selectedPlace._id)
    ? [...places, selectedPlace]
    : places;
  const placeOptions = availablePlaces.map((place) => ({
    value: place._id,
    label: translatedValue(place, "name", i18n.language) || "-",
  }));

  function onSubmit(values: CategoryFormValues) {
    onFinish({
      translation: values.translation,
      place: typeof values.place === "string" ? values.place : values.place?._id,
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
          <FormField
            control={form.control}
            name="place"
            rules={{ required: `${t("gallery.place")} ${t("general.isRequired")}` }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("gallery.place")}</FormLabel>
                <Select onValueChange={field.onChange} value={typeof field.value === "string" ? field.value : field.value?._id || ""}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder={t("general.pleaseSelect")} /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {placeOptions.map((option) => (
                      <SelectItem key={String(option.value)} value={String(option.value)}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <TranslatedNameFields label={t("gallery.categoryName")} />
          {form.watch("name") && <p>{t("general.legacyValue")}: {form.watch("name")}</p>}

          <div className="flex gap-2">
            <Button
              type="submit"
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
