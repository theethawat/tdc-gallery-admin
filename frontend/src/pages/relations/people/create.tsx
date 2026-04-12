import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import {
  CreateView,
  CreateViewHeader,
} from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import { PeopleForm, PeopleFormValue } from "@/components/refine-ui/form";
import { handleUpload } from "@/lib/upload";

export const PeopleCreate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    refineCore: { onFinish },
    ...form
  } = useForm<PeopleFormValue>({
    refineCoreProps: {
      resource: "people",
    },
  });

  const onSubmit: SubmitHandler<PeopleFormValue> = async (values) => {
    try {
      const payload: Record<string, unknown> = values;

      const image = (values as any).image;
      if (image) {
        console.log("Images to upload:", image);
        // Here you would typically handle the file upload logic,
        // such as sending the files to your backend or a cloud storage service.
        const uploadedImages = await handleUpload(Array.from(image));
        const uploadedImage = uploadedImages[0]; // Assuming you want to use the first uploaded image
        payload.image = uploadedImage; // Assuming the upload function returns an array of image URLs or IDs
      }
      console.log("Payload to submit:", payload);
      await onFinish(payload);
      navigate(-1);
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <CreateView>
      <CreateViewHeader resource="people" title={t("people.peopleCreate")} />
      <PeopleForm
        form={form as unknown as UseFormReturn<PeopleFormValue, unknown>}
        onSubmit={onSubmit}
        isLoading={form.formState.isSubmitting}
        submitLabel={t("buttons.create")}
      />
      <div className="mt-6">
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          {t("buttons.cancel")}
        </Button>
      </div>
    </CreateView>
  );
};
