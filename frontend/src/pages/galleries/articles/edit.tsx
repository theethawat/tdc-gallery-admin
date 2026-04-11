import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { EditView } from "@/components/refine-ui/views/edit-view";
import { Button } from "@/components/ui/button";
import {
  ArticleForm,
  ArticleFormValue,
} from "../../../components/refine-ui/form/article-form";

export const ArticleEdit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    refineCore: { onFinish, query },
    ...form
  } = useForm<ArticleFormValue>({
    refineCoreProps: {
      resource: "article",
    },
  });

  const articleData = query?.data?.data;

  useEffect(() => {
    if (articleData) {
      form.reset({
        name: articleData.name,
        description: articleData.description,
        categories: articleData.categories || [],
        date: articleData.date,
      });
    }
  }, [articleData]);

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

      await onFinish(payload);
      navigate(-1);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <EditView>
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
