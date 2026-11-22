import { HttpError, useResourceParams } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import { EditView } from "@/components/refine-ui/views/edit-view";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { ListViewHeader } from "@/components/refine-ui/views/list-view";
import { useTranslation } from "react-i18next";
import { Place } from "@/types";
import { TranslatedNameFields } from "@/components/refine-ui/form/translated-name-fields";

type PlaceFormValues = {
  name?: string;
  translation?: Place["translation"];
};

export const PlaceEdit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useResourceParams();
  const {
    refineCore: { onFinish },
    ...form
  } = useForm<Place, HttpError, PlaceFormValues>({
    refineCoreProps: {
      resource: "place",
      action: "edit",
      id,
      redirect: "list",
    },
  });

  function onSubmit(values: PlaceFormValues) {
    onFinish({
      translation: values.translation,
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
          <TranslatedNameFields label={t("gallery.placeName")} />
          {form.watch("name") && <p>{t("general.legacyValue")}: {form.watch("name")}</p>}

          <div className="flex gap-2">
            <Button
              type="submit"
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
