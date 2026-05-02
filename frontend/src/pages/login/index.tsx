import { Card, Form, Input, Button, Typography } from "antd";
import { useLogin, useRefineOptions } from "@refinedev/core";

type LoginFormValues = {
  username: string;
  password: string;
};

export const Login = () => {
  const { mutate: login, isPending } = useLogin();
  const { title } = useRefineOptions();

  const onFinish = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Card style={{ width: 420 }}>
        <div style={{ display: "grid", gap: 12, justifyItems: "center", marginBottom: 16 }}>
          {title.icon}
          <Typography.Title level={3} style={{ margin: 0 }}>
            Sign in
          </Typography.Title>
        </div>
        <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={isPending}>
            Sign in
          </Button>
        </Form>
      </Card>
    </div>
  );
};
