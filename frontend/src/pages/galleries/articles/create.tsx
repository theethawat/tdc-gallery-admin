import { Create, useForm, useSelect } from "@refinedev/antd";
import { DatePicker, Form, Input, Select, Upload } from "antd";
import { handleUpload } from "@/lib/upload";
import dayjs from "dayjs";

export const ArticleCreate = () => {
  const { formProps, saveButtonProps, onFinish } = useForm<any, any, any>({
    resource: "article",
    redirect: "list",
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "category",
    optionLabel: "name",
    optionValue: "_id",
    pagination: { currentPage: 1, pageSize: 1000 },
  });

  const onSubmit = async (values: any) => {
    const files = (values.images || [])
      .map((file: any) => file.originFileObj)
      .filter(Boolean);

    const uploadedImages = files.length ? await handleUpload(files) : [];

    await onFinish({
      name: values.name,
      description: values.description,
      categories: values.categories || [],
      date: values.date ? values.date.toDate() : new Date(),
      images: uploadedImages,
    });
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="categories" label="Categories">
          <Select mode="multiple" {...(categorySelectProps as any)} />
        </Form.Item>
        <Form.Item name="date" label="Date" initialValue={dayjs()}>
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
    </Create>
  );
};
