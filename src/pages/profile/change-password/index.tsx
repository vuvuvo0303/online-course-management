import { Form, Input, Button } from 'antd';
import { API_CHANGE_PASSWORD } from '../../../consts/index';
import ResponseData from '../../../models/ResponseData';
import { toast } from 'react-toastify';
import axiosInstance from '../../../services/axiosInstance';

interface ValuesChangePassword {
    oldPassword: string,
    newPassword: string
}

const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

const ChangePassword = () => {
    const onFinish = async (values: ValuesChangePassword) => {
        try {
            const response: ResponseData = await axiosInstance.put(API_CHANGE_PASSWORD, {
                user_id: user._id,
                old_password: values.oldPassword,
                new_password: values.newPassword
            })
            if (response.success) {
                toast.success("Change password successfully");
            }
        } catch (error) {
            //
        }
    };

    return (
        <Form
            name="change_password"
            onFinish={onFinish}
        >
            <Form.Item
                name="oldPassword"
                rules={[{ required: true, message: 'Please input your old password!' },
                { min: 6, message: "Password must be at least 6 character" }
                ]}
            >
                <Input.Password placeholder="Old Password" />
            </Form.Item>
            <Form.Item
                name="newPassword"
                rules={[{ required: true, message: 'Please input your new password!' },
                { min: 6, message: "Password must be at least 6 character" }
                ]}
            >
                <Input.Password placeholder="New Password" />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
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
                <Input.Password placeholder="Confirm New Password" />
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
