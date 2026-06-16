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
import {
  DiaryArticleExtensionForm,
  DiaryArticleExtensionValue,
} from "@/components/refine-ui/form/diary-article-extension-form";
import { handleUpload } from "@/lib/upload";

type DiaryArticleFormValue = ArticleFormValue & DiaryArticleExtensionValue;
type DiaryArticleSubmitValue = DiaryArticleFormValue & {
  images?: FileList | File[];
};

export const DiaryArticleCreate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    refineCore: { onFinish },
    ...form
  } = useForm<DiaryArticleFormValue>({
    refineCoreProps: {
      resource: "diary-article",
    },
  });

  const onSubmit: SubmitHandler<DiaryArticleSubmitValue> = async (values) => {
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
        withs:
          values.withs
            ?.map((person) =>
              typeof person === "string" ? person : person?._id,
            )
            .filter(Boolean) || [],
      };

      if (values.gallery) {
        payload.gallery =
          typeof values.gallery === "string"
            ? values.gallery
            : (values.gallery as { _id?: string })?._id;
      }

      const images = values.images;
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
        resource="diary-articles"
        title={t("diary.diaryArticleCreate")}
      />
      <ArticleForm
        form={form as unknown as UseFormReturn<ArticleFormValue, unknown>}
        onSubmit={onSubmit}
        isLoading={form.formState.isSubmitting}
        submitLabel={t("buttons.create")}
      />
      <DiaryArticleExtensionForm
        form={
          form as unknown as UseFormReturn<
            ArticleFormValue & DiaryArticleExtensionValue,
            unknown
          >
        }
      />
      <div className="mt-6">
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          {t("buttons.cancel")}
        </Button>
      </div>
    </CreateView>
  );
};
