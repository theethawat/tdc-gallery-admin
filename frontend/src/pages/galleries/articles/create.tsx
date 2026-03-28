import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { CreateView } from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import { ArticleForm, ArticleFormValue } from "./article-form";

export const ArticleCreate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    refineCore: { onFinish },
    ...form
  } = useForm<ArticleFormValue>({
    refineCoreProps: {
      resource: "article",
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
      };

      await onFinish(payload);
      navigate(-1);
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <CreateView>
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
