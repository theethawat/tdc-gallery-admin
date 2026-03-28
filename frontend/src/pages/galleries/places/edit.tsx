import { useOne, useResourceParams } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import { EditView } from "@/components/refine-ui/views/edit-view";
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

import { ListViewHeader } from "@/components/refine-ui/views/list-view";
import { useTranslation } from "react-i18next";

type PlaceFormValues = {
  name: string;
};

export const PlaceEdit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useResourceParams();
  const { result: record } = useOne({ resource: "place", id });

  console.log("Record in Edit:", record);
  const {
    refineCore: { onFinish },
    ...form
  } = useForm<PlaceFormValues>({
    refineCoreProps: {
      resource: "place",
    },
    defaultValues: record,
  });

  function onSubmit(values: PlaceFormValues) {
    onFinish({
      name: values.name,
    });
  }

  return (
    <EditView>
      <ListViewHeader
        resource="categories"
        title={t("gallery.placeEdit")}
        canCreate={false}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Place name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("gallery.placeName")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="Enter Place name"
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
              {form.formState.isSubmitting ? "Updating..." : t("buttons.save")}
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
