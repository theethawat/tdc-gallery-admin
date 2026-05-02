import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

type CategoryFormValues = {
  name: string;
  place: string;
};

export const CategoryCreate = () => {
  const { formProps, saveButtonProps, onFinish } = useForm<any, any, CategoryFormValues>({
    resource: "category",
    redirect: "list",
  });

  const { selectProps: placeSelectProps } = useSelect({
    resource: "place",
    optionLabel: "name",
    optionValue: "_id",
    pagination: {
      currentPage: 1,
      pageSize: 1000,
    },
  });

  const handleFinish = (values: CategoryFormValues) => {
    return onFinish({
      name: values.name,
      place: values.place,
    });
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="place" label="Place" rules={[{ required: true }]}>
          <Select placeholder="Select a place" {...(placeSelectProps as any)} />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Enter category name" />
        </Form.Item>
      </Form>
    </Create>
  );
};
