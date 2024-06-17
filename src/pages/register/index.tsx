import { Button, Checkbox, Form, FormProps, Image, Input, Modal, Radio, Upload } from "antd";
import { Link } from "react-router-dom";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Vector from "../../assets/Vector.png";
import Ractangle from "../../assets/Rectangle .jpg";
// import { postStudent, postInstructor } from '../../services/post';

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type FieldType = {
  username?: string;
  email?: string;
  phonenumber?: string;
  password?: string;
  avatar?: string;
  policy?: string;
  role?: string;
};

const RegisterPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    if (values.role === 'student') {
      // postStudent(values);
    } else if (values.role === 'instructor') {
      // postInstructor(values);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="flex min-h-screen relative">
      <img src={Vector} alt="" className="absolute bottom-8" />

      <div className="w-full md:w-1/2 flex flex-col justify-center  pt-5 bg-white rounded-l-lg">
        <div className="mr-4">
          <h1 className="flex justify-center mb-4 text-3xl md:text-7xl font-bold">Register </h1>
          <span className="flex justify-center mb-4">Learn from top experts. Sign up for FLearn now!</span>
        </div>
        <div className="mb-6">
          <div className="mt- flex justify-center ">
            <Form
              name="basic"
              className="space-y-0"
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true, role: 'student' }} // Set default role here
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter the correct email format!" },
                  { pattern: /^\S*$/, message: "Email must not contain spaces!" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="mb-1"
              >
                <Input className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                  { pattern: /^\S*$/, message: "Username must not contain spaces!" },
                  { min: 4, message: "Username must be at least 4 characters!" },
                  { max: 20, message: "Username must be at most 20 characters!" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be at least 6 characters!" },
                  { pattern: /^\S*$/, message: "Password must not contain spaces!" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input.Password className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phonenumber"
                rules={[
                  { required: true, message: "Please input your Phone Number!" },
                  { pattern: /^\d{10}$/, message: "Phone Number must be exactly 10 digits!" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </Form.Item>
              <Form.Item<FieldType>
                label="Avatar"
                name="avatar"
                rules={[{ required: true, message: "Please upload your Avatar!" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item<FieldType>
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select your role!" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group>
                  <Radio value="student">Student</Radio>
                  <Radio value="instructor">Instructor</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item<FieldType>
                name="policy"
                valuePropName="checked"
                rules={[{ required: true, message: "Please accept Policy!" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Checkbox className="mt-2">Agree to Terms and Conditions</Checkbox>
                <span onClick={openModal} className="hover:cursor-pointer font-bold hover:text-red-400">
                  (See Policy)
                </span>
                <Modal title="Policy" open={isModalOpen} onCancel={handleCancel} onOk={handleOk}></Modal>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button type="primary" htmlType="submit" className="mt-2 w-full shadow-xl hover:shadow-sky-600 bg-black">
                  Create Account
                </Button>
              </Form.Item>
            </Form>
          </div>
          <span className="mt-4 block text-center">
            Do you have an account?{" "}
            <strong>
              <Link to={"/login"} className="hover:cursor-pointer hover:text-red-400">
                Sign In here
              </Link>
            </strong>
          </span>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 pb-12 items-center justify-center">
        <div className="rounded-lg overflow-hidden w-[80%] shadow-pink-300 mt-20">
          <img className="shadow-xl rounded-xl w-full" src={Ractangle} alt="logo" />
        </div>
      </div>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
        )}
  
        <Modal
          title="Policy"
          visible={isModalOpen}
          onCancel={handleCancel}
          onOk={handleOk}
        >
          {/* Nội dung của modal ở đây */}
          <p>This is where your policy content goes.</p>
        </Modal>
      </div>
    );
  };
  
  export default RegisterPage;
  
