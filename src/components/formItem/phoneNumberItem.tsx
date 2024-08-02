import { Form, Input } from "antd"
import { phoneNumberRules } from "../../consts"

const PhoneNumberFormItem: React.FC = () => {
    return (
        <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={phoneNumberRules}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="mb-3"
        >
            <Input placeholder="Enter Phone Number" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " />
        </Form.Item>
    )
}

export default PhoneNumberFormItem