import { useOne, useResourceParams } from "@refinedev/core";

import { ShowView } from "@/components/refine-ui/views/show-view";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "@/types";
import { useTranslation } from "react-i18next";
import { translatedValue } from "@/lib/translations";
import { TranslatedFields } from "@/components/refine-ui/views/translated-fields";

export const CategoryShow = () => {
  const { t, i18n } = useTranslation();
  const { id } = useResourceParams();
  const {
    result: record,
    query: { isLoading, isFetching },
  } = useOne<Category>({
    resource: "category",
    id,
  });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <ShowView>
      <Card>
        <CardHeader>
          <CardTitle>{translatedValue(record, "name", i18n.language) || "-"}</CardTitle>
          <CardDescription>Category ID: {record?._id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <TranslatedFields record={record} fields={[{ key: "name", label: t("gallery.categoryName") }]} />
            {record?.place && (
              <div>
                <h4 className="text-sm font-medium mb-2">{t("gallery.place")}</h4>
                <TranslatedFields record={record.place} fields={[{ key: "name", label: t("gallery.placeName") }]} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ShowView>
  );
};
