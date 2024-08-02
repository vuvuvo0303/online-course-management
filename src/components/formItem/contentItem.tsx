import { Form } from "antd";
import { TinyMCEEditorComponent } from "../index";
import { contentRules } from "../../consts";

interface TinyMCEFormItemProps {
    value: string;
    onEditorChange: (value: string) => void;
}

const ContentFormItem: React.FC<TinyMCEFormItemProps> = ({ value, onEditorChange }) => {
    return (
        <Form.Item
            name="content"
            label="Content"
            rules={contentRules}
        >
            <TinyMCEEditorComponent value={value} onEditorChange={onEditorChange} />
        </Form.Item>
    );
};

export default ContentFormItem;
