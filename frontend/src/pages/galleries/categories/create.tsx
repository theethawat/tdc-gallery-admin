import { HttpError, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Category, Place } from "@/types";
import { translatedValue } from "@/lib/translations";
import { TranslatedNameFields } from "@/components/refine-ui/form/translated-name-fields";

import { CreateView } from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategoryFormValues = {
  name?: string;
  translation?: Category["translation"];
  place: string;
};

export const CategoryCreate = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const {
    refineCore: { onFinish },
    ...form
  } = useForm<Category, HttpError, CategoryFormValues>({
    refineCoreProps: {
      resource: "category",
    },
  });

  const { query: placeQuery } = useSelect<Place>({
    resource: "place",
    optionValue: "_id",
    pagination: {
      currentPage: 1,
      pageSize: 1000,
    },
  });
  const placeOptions = (placeQuery.data?.data || []).map((place) => ({
    value: place._id,
    label: translatedValue(place, "name", i18n.language) || "-",
  }));

  function onSubmit(values: CategoryFormValues) {
    onFinish({
      translation: values.translation,
      place: values.place,
    }).then(() => {
      navigate(-1);
    });
  }

  return (
    <CreateView>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a place" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {placeOptions?.map((option) => (
                      <SelectItem
                        key={String(option.value)}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <TranslatedNameFields label={t("gallery.categoryName")} />

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Creating..." : "Create"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </CreateView>
  );
};
