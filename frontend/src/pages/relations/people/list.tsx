import { useTranslation } from "react-i18next";
import { People, PeopleStatusInfo } from "@/types";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Input, Space, Table, Tag } from "antd";

export const PeopleList = () => {
  const { t, i18n } = useTranslation();
  const { tableProps, setFilters } = useTable<People>({
    syncWithLocation: true,
    resource: "people",
  });

  return (
    <List>
      <Input.Search
        placeholder={`Search by ${t("people.name").toLowerCase()}`}
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
            title: t("people.name"),
            dataIndex: "name",
          },
          {
            title: t("people.calledName"),
            dataIndex: "calledName",
          },
          {
            title: t("people.status"),
            dataIndex: "status",
            render: (status: keyof typeof PeopleStatusInfo) => {
              const statusInfo = PeopleStatusInfo[status];
              return (
                <Tag color="blue">
                  {statusInfo?.translation[
                    i18n.language as keyof typeof statusInfo.translation
                  ] || status}
                </Tag>
              );
            },
          },
          {
            title: t("people.nationality"),
            dataIndex: "nationality",
          },
          {
            title: t("general.actions"),
            render: (_value, record) => (
              <Space>
                <EditButton hideText recordItemId={record._id} resource="people" />
                <ShowButton hideText recordItemId={record._id} resource="people" />
                <DeleteButton hideText recordItemId={record._id} resource="people" />
              </Space>
            ),
          },
        ]}
      />
    </List>
  );
};
