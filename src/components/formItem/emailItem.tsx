import React from 'react';
import { Form, Input } from 'antd';
import { emailRules } from '../../consts';

interface EmailFormItemProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailFormItem: React.FC<EmailFormItemProps> = ({ value, onChange }) => {
    return (
        <Form.Item
            name="email"
            label="Email"
            rules={emailRules}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="mb-1"
        >
            <Input
                placeholder="Enter Email"
                value={value}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mx-auto"
            />
        </Form.Item>
    );
};

export default EmailFormItem;
