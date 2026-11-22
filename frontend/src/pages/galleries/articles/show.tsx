import { useShow, useResourceParams } from "@refinedev/core";
import { useTranslation } from "react-i18next";

import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Article } from "@/types";
import { translatedValue } from "@/lib/translations";
import { TranslatedFields } from "@/components/refine-ui/views/translated-fields";

export const ArticleShow = () => {
  const { t, i18n } = useTranslation();
  const { id } = useResourceParams();

  const { result: record } = useShow<Article>({
    resource: "gallery-article",
    id,
  });
  return (
    <ShowView>
      <ShowViewHeader resource="articles" title={t("gallery.article")} />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{translatedValue(record, "name", i18n.language) || "-"}</CardTitle>
                <CardDescription>ID: {record?._id}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Categories */}
            <div>
              <h4 className="text-sm font-medium mb-2">
                {t("gallery.category")}
              </h4>
              {record?.categories?.length
                ? record.categories.map((category) => (
                    <TranslatedFields key={category._id} record={category} fields={[{ key: "name", label: t("gallery.categoryName") }]} />
                  ))
                : "-"}
            </div>

            <Separator />

            {/* Date */}
            {record?.date && (
              <>
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    {t("general.date")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(record.date).toLocaleDateString()}
                  </p>
                </div>

                <Separator />
              </>
            )}

            {/* Created At */}
            {record?.createdAt && (
              <>
                <div>
                  <h4 className="text-sm font-medium mb-2">Created At</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <Separator />
              </>
            )}

            {/* Description */}
            <TranslatedFields record={record} fields={[
              { key: "name", label: t("gallery.articleName") },
              { key: "description", label: t("gallery.articleContent") },
            ]} />
          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
};
