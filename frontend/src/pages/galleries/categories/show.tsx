import { useResourceParams, useShow } from "@refinedev/core";
import { Show } from "@refinedev/antd";
import { Descriptions } from "antd";
import { Category } from "@/types";

export const CategoryShow = () => {
  const { id } = useResourceParams();
  const { query } = useShow<Category>({
    resource: "category",
    id,
  });
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="ID">{record?._id}</Descriptions.Item>
        <Descriptions.Item label="Name">{record?.name}</Descriptions.Item>
        <Descriptions.Item label="Place">{record?.place?.name}</Descriptions.Item>
      </Descriptions>
    </Show>
  );
};
