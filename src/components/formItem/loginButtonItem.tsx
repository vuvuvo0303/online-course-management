import { Button, Form } from "antd";

interface LoginButtonItemProps {
    loading: boolean;
}

const LoginButtonItem: React.FC<LoginButtonItemProps> = ({ loading }) => {
    return (
        <Form.Item>
            <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full mt-7 hover:opacity-90 shadow-sky-600"
                loading={loading}
                disabled={loading}
                aria-label="Login Button"
                style={{ width: "100%" }}
            >
                {loading ? "Logging in..." : "Login"}
            </Button>
        </Form.Item>
    );
};

export default LoginButtonItem;
