import { useShow, useResourceParams } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import { Show } from "@refinedev/antd";
import { Descriptions } from "antd";
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
    <Show isLoading={isLoading}>
      <Descriptions column={1} bordered title={t("relation.people")}>
        <Descriptions.Item label="ID">{record?._id}</Descriptions.Item>
        <Descriptions.Item label={t("people.name")}>
          {record?.name}
        </Descriptions.Item>
        <Descriptions.Item label={t("people.calledName")}>
          {record?.calledName || "-"}
        </Descriptions.Item>
        <Descriptions.Item label={t("people.status")}>
          {record?.status || "-"}
        </Descriptions.Item>
        <Descriptions.Item label={t("people.birthday")}>
          {record?.birthday
            ? new Date(record.birthday).toLocaleDateString()
            : "-"}
        </Descriptions.Item>
        <Descriptions.Item label={t("people.note")}>
          {record?.note || "-"}
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};
