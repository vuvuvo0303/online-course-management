import { Form, Input } from "antd"
import { titleRules } from "../../consts"

const TitleFormItem: React.FC = () => {
    return (
        <Form.Item name="name" label="Title" rules={titleRules}>
            <Input placeholder="Enter Title" />
        </Form.Item>
    )
}

export default TitleFormItem