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
import { People } from "@/types";

export const PeopleShow = () => {
  const { t } = useTranslation();
  const { id } = useResourceParams();

  const { result: record, query } = useShow<People>({
    resource: "people",
    id,
  });
  const { isLoading } = query;
  return (
    <ShowView>
      <ShowViewHeader resource="people" title={t("relation.people")} />
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
                {t("people.calledName")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {record?.calledName || "-"}
              </p>
            </div>

            <Separator />

            {/* Date */}
            {record?.birthday && (
              <>
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    {t("people.birthday")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(record.birthday).toLocaleDateString()}
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
          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
};
