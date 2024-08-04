import { Form, Input } from 'antd';

interface NumberFormItemProp {
    label: string,
    name: string,
    requiredMessage: string,
}

const NumberFormItem: React.FC<NumberFormItemProp> = ({ label, name, requiredMessage }) => (
    <Form.Item
        label={label}
        name={name}
        rules={[{ required: true, message: requiredMessage }]}
    >
        <Input type="number" placeholder='Enter a number' />
    </Form.Item>
);

export default NumberFormItem;
