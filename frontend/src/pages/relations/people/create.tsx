import { Create, useForm } from "@refinedev/antd";
import { DatePicker, Form, Input, Select, Upload } from "antd";
import { useTranslation } from "react-i18next";
import { PeopleStatus } from "@/types";
import { handleUpload } from "@/lib/upload";

export const PeopleCreate = () => {
  const { t } = useTranslation();

  const { formProps, saveButtonProps, onFinish } = useForm<any, any, any>({
    resource: "people",
    redirect: "list",
  });

  const onSubmit = async (values: any) => {
    const files = (values.image || [])
      .map((file: any) => file.originFileObj)
      .filter(Boolean);
    const uploadedImages = files.length ? await handleUpload(files) : [];

    await onFinish({
      ...values,
      birthday: values.birthday ? values.birthday.toDate() : undefined,
      knownDate: values.knownDate ? values.knownDate.toDate() : undefined,
      image: uploadedImages[0],
    });
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="name"
          label={t("people.name")}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="calledName" label={t("people.calledName")}>
          <Input />
        </Form.Item>
        <Form.Item name="nickname" label={t("people.nickname")}>
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label={t("people.status")}
          rules={[{ required: true }]}
        >
          <Select
            options={Object.values(PeopleStatus).map((value) => ({
              label: value,
              value,
            }))}
          />
        </Form.Item>
        <Form.Item name="birthday" label={t("people.birthday")}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="knownDate" label={t("people.knownDate")}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="nationality" label={t("people.nationality")}>
          <Input />
        </Form.Item>
        <Form.Item name="meetingPlace" label={t("people.meetingPlace")}>
          <Input />
        </Form.Item>
        <Form.Item name="note" label={t("people.note")}>
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={(event) => event?.fileList}
        >
          <Upload beforeUpload={() => false} maxCount={1}>
            <a>Choose file</a>
          </Upload>
        </Form.Item>
      </Form>
    </Create>
  );
};
