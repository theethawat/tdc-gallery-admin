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
import {
  ArticleForm,
  ArticleFormValue,
} from "@/components/refine-ui/form/article-form";
import { handleUpload } from "@/lib/upload";

export const DiaryArticleEdit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useResourceParams();
  const {
    refineCore: { onFinish, query },
    ...form
  } = useForm<ArticleFormValue>({
    refineCoreProps: {
      resource: "diary-article",
      action: "edit",
      id,
    },
  });

  useEffect(() => {
    if (query?.data?.data?.date) {
      const date = new Date(query.data.data.date);
      form.setValue("date", date);
    }

    return () => {};
  }, [query?.data]);

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
      console.error("Error updating article:", error);
    }
  };

  return (
    <EditView>
      <EditViewHeader
        resource="diary-article"
        title={t("gallery.articleEdit")}
      />
      <ArticleForm
        form={form as unknown as UseFormReturn<ArticleFormValue, unknown>}
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
