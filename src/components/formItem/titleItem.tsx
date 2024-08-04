import { Form, Input } from "antd"
import { titleRules } from "../../consts"

const TitleFormItem: React.FC = () => {
    return (
        <Form.Item name="name" label="Title" rules={titleRules}>
            <Input />
        </Form.Item>
    )
}

export default TitleFormItem