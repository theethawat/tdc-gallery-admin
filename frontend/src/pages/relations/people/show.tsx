import { useShow, useResourceParams } from "@refinedev/core";
import { useTranslation } from "react-i18next";

import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { PeopleProfileCard } from "@/components/refine-ui/custom/people-profile-card";
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
      <PeopleProfileCard record={record} isLoading={isLoading} />
    </ShowView>
  );
};
