import { Form, Input, Button } from 'antd';
import { changePassword } from "../../../services/users.ts";

interface ValuesChangePassword {
    oldPassword: string,
    newPassword: string
}
const ChangePassword = () => {

    const onFinish = (values: ValuesChangePassword) => {
        changePassword(values);
    }
    return (
        <Form
            name="change_password"
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                name="oldPassword"
                label="Old Password"
                rules={[{ required: true, message: 'Please input your old password!' },
                { min: 6, message: "Password must be at least 6 character" }
                ]}
            >
                <Input.Password placeholder="Enter Old Password" />
            </Form.Item>
            <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: 'Please input your new password!' },
                { min: 6, message: "Password must be at least 6 character" }
                ]}
            >
                <Input.Password placeholder="Enter New Password" />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                rules={[
                    { required: true, message: 'Please confirm your new password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="Enter Confirm New Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Change Password
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ChangePassword;