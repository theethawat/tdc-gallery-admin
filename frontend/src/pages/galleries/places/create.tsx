import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { HttpError } from "@refinedev/core";
import { Place } from "@/types";
import { TranslatedNameFields } from "@/components/refine-ui/form/translated-name-fields";

import { CreateView } from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

type PlaceFormValues = {
  name?: string;
  translation?: Place["translation"];
};

export const PlaceCreate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    refineCore: { onFinish },
    ...form
  } = useForm<Place, HttpError, PlaceFormValues>({
    refineCoreProps: {
      resource: "place",
    },
  });

  function onSubmit(values: PlaceFormValues) {
    onFinish({
      translation: values.translation,
    }).then(() => {
      navigate(-1);
    });
  }

  return (
    <CreateView>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <TranslatedNameFields label={t("gallery.placeName")} />

          <div className="flex gap-2">
            <Button
              type="submit"
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
