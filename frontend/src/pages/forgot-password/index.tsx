import { Card, Form, Input, Button, Typography } from "antd";
import { useForgotPassword } from "@refinedev/core";

type ForgotFormValues = {
  email: string;
};

export const ForgotPassword = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const onFinish = (values: ForgotFormValues) => {
    forgotPassword(values);
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Card style={{ width: 420 }}>
        <Typography.Title level={3}>Forgot password</Typography.Title>
        <Form<ForgotFormValues> layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={isPending}>
            Send reset link
          </Button>
        </Form>
      </Card>
    </div>
  );
};
