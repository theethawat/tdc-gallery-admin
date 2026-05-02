import { useEffect } from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Category } from "@/types";
import { Form, Input, Select } from "antd";

type CategoryFormValues = {
  name: string;
  place: string;
};

export const CategoryEdit = () => {
  const { formProps, saveButtonProps, onFinish, query } = useForm<any, any, CategoryFormValues>({
    resource: "category",
    action: "edit",
    redirect: "list",
  });

  const categoryData = query?.data?.data as Category | undefined;

  const { selectProps: placeSelectProps } = useSelect({
    resource: "place",
    optionLabel: "name",
    optionValue: "_id",
    pagination: {
      currentPage: 1,
      pageSize: 1000,
    },
  });

  useEffect(() => {
    if (categoryData?.place?._id && formProps.form) {
      formProps.form.setFieldsValue({
        place: categoryData.place._id,
        name: categoryData.name,
      });
    }
  }, [categoryData, formProps.form]);

  const handleFinish = (values: CategoryFormValues) => {
    return onFinish({
      name: values.name,
      place: values.place,
    });
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="place" label="Place" rules={[{ required: true }]}>
          <Select placeholder="Select a place" {...(placeSelectProps as any)} />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Enter category name" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
