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
} from "../../../components/refine-ui/form/article-form";

export const ArticleEdit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useResourceParams();
  const {
    refineCore: { onFinish, query },
    ...form
  } = useForm<ArticleFormValue>({
    refineCoreProps: {
      resource: "article",
      action: "edit",
      id,
      redirect: "list",
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

      await onFinish(payload);
      navigate(-1);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <EditView>
      <EditViewHeader resource="article" title={t("gallery.articleEdit")} />
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
