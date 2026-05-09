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

export const DiaryArticleShow = () => {
  const { t } = useTranslation();
  const { id } = useResourceParams();

  const { result: record, query } = useShow<Article>({
    resource: "diary-article",
    id,
  });
  const { isLoading } = query;
  return (
    <ShowView>
      <ShowViewHeader resource="diary-articles" title={t("gallery.article")} />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{record?.name}</CardTitle>
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
              <p className="text-sm text-muted-foreground">
                {record?.categories && record.categories.length > 0
                  ? record.categories.map((cat: any) => cat?.name).join(", ")
                  : "-"}
              </p>
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
            <div>
              <h4 className="text-sm font-medium mb-4">
                {t("gallery.articleContent")}
              </h4>
              <div className="prose prose-sm max-w-none">
                {record?.description ? (
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {record.description}
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    No description available
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
};
