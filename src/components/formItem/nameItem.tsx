import { Form, Input } from "antd"
import { nameRules } from "../../consts"

const NameFormItem: React.FC = () => {
    return (
        <Form.Item
            label="Name"
            name="name"
            rules={nameRules}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="mb-3"
        >
            <Input placeholder="Enter Name" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " />
        </Form.Item>
    )
}

export default NameFormItem