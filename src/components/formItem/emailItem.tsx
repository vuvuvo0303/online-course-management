import { Form, Input } from "antd";
import { emailRules } from "../../consts";

const EmailFormItem: React.FC = () => {
    return (
        <Form.Item
            name="email"
            label="Email"
            rules={emailRules}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
        >
            <Input
                placeholder="Enter Email"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mx-auto"
            />
        </Form.Item>
    );
};

export default EmailFormItem;
