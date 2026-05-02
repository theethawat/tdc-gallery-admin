import { Place } from "@/types";
import { useTranslation } from "react-i18next";
import {
  DeleteButton,
  EditButton,
  List,
  useTable,
} from "@refinedev/antd";
import { Input, Space, Table } from "antd";

export const PlaceList = () => {
  const { t } = useTranslation();
  const { tableProps, setFilters } = useTable<Place>({
    syncWithLocation: true,
    resource: "place",
  });

  return (
    <List>
      <Input.Search
        placeholder="Search by place name"
        allowClear
        onSearch={(value) => {
          setFilters(
            value
              ? [{ field: "name", operator: "contains", value }]
              : [],
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
            title: t("gallery.placeName"),
            dataIndex: "name",
          },
          {
            title: t("general.actions"),
            render: (_value, record) => (
              <Space>
                <EditButton hideText recordItemId={record._id} resource="places" />
                <DeleteButton hideText recordItemId={record._id} resource="places" />
              </Space>
            ),
          },
        ]}
      />
    </List>
  );
};
