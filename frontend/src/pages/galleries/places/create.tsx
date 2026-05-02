import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

type PlaceFormValues = {
  name: string;
};

export const PlaceCreate = () => {
  const { t } = useTranslation();
  const { formProps, saveButtonProps, onFinish } = useForm<
    any,
    any,
    PlaceFormValues
  >({
    resource: "place",
    redirect: "list",
  });

  const onSubmit = (values: PlaceFormValues) => {
    return onFinish({
      name: values.name,
    });
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="name"
          label={t("gallery.placeName")}
          rules={[{ required: true, message: "Place name is required" }]}
        >
          <Input placeholder="Enter place name" />
        </Form.Item>
      </Form>
    </Create>
  );
};
