import { Form, Input } from "antd";
import { videoRules } from "../../consts";

const VideoFormItem: React.FC = () => {
  return (
    <Form.Item
      label="Video"
      name="video"
      rules={videoRules}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      className="mb-5"
    >
      <Input
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Enter Video"
      />
    </Form.Item>
  );
};

export default VideoFormItem;
