import { useResourceParams } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import {
  EditView,
  EditViewHeader,
} from "@/components/refine-ui/views/edit-view";
import { Button } from "@/components/ui/button";
import { PeopleForm, PeopleFormValue } from "@/components/refine-ui/form";
import { handleUpload } from "@/lib/upload";

export const PeopleEdit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useResourceParams();
  const {
    refineCore: { onFinish, query },
    ...form
  } = useForm<PeopleFormValue>({
    refineCoreProps: {
      resource: "people",
      action: "edit",
      id,
      redirect: "show",
    },
  });

  useEffect(() => {
    if (query?.data?.data?.birthday) {
      const date = new Date(query.data.data.birthday);
      form.setValue("birthday", date);
    }

    if (query?.data?.data?.knownDate) {
      const date = new Date(query.data.data.knownDate);
      form.setValue("knownDate", date);
    }

    return () => {};
  }, [query?.data]);

  const onSubmit: SubmitHandler<PeopleFormValue> = async (values) => {
    try {
      const payload: Record<string, unknown> = values;
      const images = (values as any).image;
      if (images) {
        console.log("Images to upload:", images);
        // Here you would typically handle the file upload logic,
        // such as sending the files to your backend or a cloud storage service.
        const uploadedImages = await handleUpload(Array.from(images));
        const uploadedImage = uploadedImages[0]; // Assuming you want to use the first uploaded image
        payload.image = uploadedImage; // Assuming the upload function returns an array of image URLs or IDs
      }
      console.log("Payload to submit:", payload);
      await onFinish(payload);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <EditView>
      <EditViewHeader resource="people" title={t("people.peopleEdit")} />
      <PeopleForm
        form={form as unknown as UseFormReturn<PeopleFormValue, unknown>}
        onSubmit={onSubmit}
        isLoading={form.formState.isSubmitting}
        submitLabel={t("buttons.save")}
      />
      <div className="mt-6">
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          {t("buttons.cancel")}
        </Button>
      </div>
    </EditView>
  );
};
