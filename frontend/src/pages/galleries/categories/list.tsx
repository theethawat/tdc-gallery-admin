import { Category } from "@/types";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Space, Table, Input } from "antd";
import { useTranslation } from "react-i18next";

export const CategoryList = () => {
  const { t } = useTranslation();
  const { tableProps, setFilters } = useTable<Category>({
    syncWithLocation: true,
    resource: "category",
  });

  return (
    <List>
      <Input.Search
        placeholder="Search by category name"
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
            title: t("gallery.categoryName"),
            dataIndex: "name",
          },
          {
            title: t("gallery.place"),
            dataIndex: ["place", "name"],
          },
          {
            title: t("general.actions"),
            render: (_value, record) => (
              <Space>
                <EditButton
                  hideText
                  recordItemId={record._id}
                  resource="categories"
                />
                <ShowButton
                  hideText
                  recordItemId={record._id}
                  resource="categories"
                />
                <DeleteButton
                  hideText
                  recordItemId={record._id}
                  resource="category"
                />
              </Space>
            ),
          },
        ]}
      />
    </List>
  );
};
