import { Form, Rate } from "antd"
import { ratingRules } from "../../consts"

const RatingFormItem: React.FC = () => {
    return (
        <Form.Item
            name="rating"
            label="Rating"
            rules={ratingRules}
        >
            <Rate allowHalf />
        </Form.Item>
    )
}

export default RatingFormItem