import { Card, Form, Input, Button, Typography } from "antd";
import { useRegister } from "@refinedev/core";

type RegisterFormValues = {
  email: string;
  password: string;
};

export const Register = () => {
  const { mutate: register, isPending } = useRegister();

  const onFinish = (values: RegisterFormValues) => {
    register(values);
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Card style={{ width: 420 }}>
        <Typography.Title level={3}>Sign up</Typography.Title>
        <Form<RegisterFormValues> layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={isPending}>
            Sign up
          </Button>
        </Form>
      </Card>
    </div>
  );
};
