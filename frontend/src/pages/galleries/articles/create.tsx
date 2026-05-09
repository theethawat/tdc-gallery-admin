import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import {
  CreateView,
  CreateViewHeader,
} from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import {
  ArticleForm,
  ArticleFormValue,
} from "@/components/refine-ui/form/article-form";
import { handleUpload } from "@/lib/upload";

export const ArticleCreate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    refineCore: { onFinish },
    ...form
  } = useForm<ArticleFormValue>({
    refineCoreProps: {
      resource: "gallery-article",
      redirect: "list",
    },
  });

  const onSubmit: SubmitHandler<ArticleFormValue> = async (values) => {
    try {
      const payload: Record<string, unknown> = {
        name: values.name,
        description: values.description,
        categories:
          values.categories?.map((cat) =>
            typeof cat === "string" ? cat : cat._id,
          ) || [],
        date: values.date || new Date(),
        images: [], // Placeholder for image URLs or IDs after upload
      };

      const images = (values as any).images;
      if (images) {
        console.log("Images to upload:", images);
        // Here you would typically handle the file upload logic,
        // such as sending the files to your backend or a cloud storage service.
        const uploadedImages = await handleUpload(Array.from(images));
        payload.images = uploadedImages; // Assuming the upload function returns an array of image URLs or IDs
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
      <CreateViewHeader
        resource="articles"
        title={t("gallery.articleCreate")}
      />
      <ArticleForm
        form={form as unknown as UseFormReturn<ArticleFormValue, unknown>}
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
