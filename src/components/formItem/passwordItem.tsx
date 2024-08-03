import { Form, Input } from "antd";
import { passwordRules } from "../../consts";

const PasswordFormItem: React.FC = () => {
    return (
        <Form.Item
            name="password"
            label="Password"
            rules={passwordRules}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
        >
            <Input.Password
                placeholder="Enter Password"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mx-auto"
            />
        </Form.Item>
    );
};

export default PasswordFormItem;
