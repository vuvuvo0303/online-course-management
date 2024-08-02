import { Form, Input } from "antd"
import { descriptionRules } from "../../consts"

const DescriptionFormItem: React.FC = () => {
    return (
        <Form.Item
            label="Description"
            name="description"
            rules={descriptionRules}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="mb-3"
        >
            <Input.TextArea placeholder="Enter Description" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " />
        </Form.Item>
    )
}

export default DescriptionFormItem