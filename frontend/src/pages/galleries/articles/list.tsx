import { Article } from "@/types";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Input, Space, Table } from "antd";
import { useTranslation } from "react-i18next";

export const ArticleList = () => {
  const { t } = useTranslation();
  const { tableProps, setFilters } = useTable<Article>({
    syncWithLocation: true,
    resource: "article",
  });

  return (
    <List>
      <Input.Search
        placeholder={`Search by ${t("gallery.articleName").toLowerCase()}`}
        allowClear
        onSearch={(value) => {
          setFilters(
            value ? [{ field: "name", operator: "contains", value }] : [],
            "replace",
          );
        }}
      />
      <Table
        {...(tableProps as any)}
        rowKey="_id"
        style={{ marginTop: 16 }}
        columns={[
          {
            title: "No.",
            width: 90,
            render: (_value, _record, index) => index + 1,
          },
          {
            title: t("gallery.articleName"),
            dataIndex: "name",
          },
          {
            title: t("general.description"),
            dataIndex: "description",
            render: (value: string) =>
              value ? `${value.slice(0, 80)}...` : "-",
          },
          {
            title: t("gallery.category"),
            dataIndex: "categories",
            render: (categories: Article["categories"]) =>
              categories?.length
                ? categories.map((cat) => cat?.name).join(", ")
                : "-",
          },
          {
            title: t("general.date"),
            dataIndex: "date",
            render: (value: string) =>
              value ? new Date(value).toLocaleDateString() : "-",
          },
          {
            title: t("general.actions"),
            render: (_value, record) => (
              <Space>
                <EditButton
                  hideText
                  recordItemId={record._id}
                  resource="articles"
                />
                <ShowButton
                  hideText
                  recordItemId={record._id}
                  resource="articles"
                />
                <DeleteButton
                  hideText
                  recordItemId={record._id}
                  resource="article"
                />
              </Space>
            ),
          },
        ]}
      />
    </List>
  );
};
