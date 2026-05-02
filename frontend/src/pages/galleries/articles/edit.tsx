import { useEffect } from "react";
import { DatePicker, Form, Input, Select, Upload } from "antd";
import dayjs from "dayjs";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { handleUpload } from "@/lib/upload";

export const ArticleEdit = () => {
  const { formProps, saveButtonProps, onFinish, query } = useForm<any, any, any>({
    resource: "article",
    action: "edit",
    redirect: "list",
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "category",
    optionLabel: "name",
    optionValue: "_id",
    pagination: { currentPage: 1, pageSize: 1000 },
  });

  useEffect(() => {
    const record = query?.data?.data;
    if (record && formProps.form) {
      formProps.form.setFieldsValue({
        ...record,
        categories: (record.categories || []).map((cat: any) => cat._id),
        date: record.date ? dayjs(record.date) : null,
      });
    }
  }, [query?.data, formProps.form]);

  const onSubmit = async (values: any) => {
    const files = (values.images || [])
      .map((file: any) => file.originFileObj)
      .filter(Boolean);
    const uploadedImages = files.length ? await handleUpload(files) : undefined;

    await onFinish({
      name: values.name,
      description: values.description,
      categories: values.categories || [],
      date: values.date ? values.date.toDate() : new Date(),
      ...(uploadedImages ? { images: uploadedImages } : {}),
    });
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="categories" label="Categories">
          <Select mode="multiple" {...(categorySelectProps as any)} />
        </Form.Item>
        <Form.Item name="date" label="Date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item
          name="images"
          label="Images"
          valuePropName="fileList"
          getValueFromEvent={(event) => event?.fileList}
        >
          <Upload beforeUpload={() => false} multiple>
            <a>Choose files</a>
          </Upload>
        </Form.Item>
      </Form>
    </Edit>
  );
};
