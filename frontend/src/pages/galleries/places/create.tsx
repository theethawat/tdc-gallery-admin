import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

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
import { Input } from "@/components/ui/input";

type PlaceFormValues = {
  name: string;
};

export const PlaceCreate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    refineCore: { onFinish },
    ...form
  } = useForm<PlaceFormValues>({
    refineCoreProps: {
      resource: "place",
    },
  });

  function onSubmit(values: PlaceFormValues) {
    onFinish({
      name: values.name,
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
            name="name"
            rules={{ required: "Category name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("gallery.placeName")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="Enter place name"
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
                ? "Creating..."
                : t("buttons.create")}
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
    </CreateView>
  );
};
