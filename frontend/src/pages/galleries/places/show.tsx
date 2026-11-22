import { useResourceParams, useShow } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { TranslatedFields } from "@/components/refine-ui/views/translated-fields";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { translatedValue } from "@/lib/translations";
import { Place } from "@/types";

export const PlaceShow = () => {
  const { t, i18n } = useTranslation();
  const { id } = useResourceParams();
  const { result: record } = useShow<Place>({ resource: "place", id });

  return (
    <ShowView>
      <ShowViewHeader resource="places" title={t("gallery.place")} />
      <Card>
        <CardHeader><CardTitle>{translatedValue(record, "name", i18n.language) || "-"}</CardTitle></CardHeader>
        <CardContent>
          <TranslatedFields record={record} fields={[{ key: "name", label: t("gallery.placeName") }]} />
        </CardContent>
      </Card>
    </ShowView>
  );
};
