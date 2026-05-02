import { useShow, useResourceParams } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import { Show } from "@refinedev/antd";
import { Descriptions } from "antd";
import { Article } from "@/types";

export const ArticleShow = () => {
  const { t } = useTranslation();
  const { id } = useResourceParams();

  const { result: record, query } = useShow<Article>({
    resource: "article",
    id,
  });
  const { isLoading } = query;

  return (
    <Show isLoading={isLoading}>
      <Descriptions column={1} bordered title={t("gallery.article")}>
        <Descriptions.Item label="ID">{record?._id}</Descriptions.Item>
        <Descriptions.Item label={t("gallery.articleName")}>{record?.name}</Descriptions.Item>
        <Descriptions.Item label={t("gallery.category")}>
          {record?.categories?.map((cat) => cat?.name).join(", ") || "-"}
        </Descriptions.Item>
        <Descriptions.Item label={t("general.date")}>
          {record?.date ? new Date(record.date).toLocaleDateString() : "-"}
        </Descriptions.Item>
        <Descriptions.Item label={t("gallery.articleContent")}>
          {record?.description || "-"}
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};
