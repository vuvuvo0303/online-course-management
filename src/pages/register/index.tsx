import { Button, Checkbox, Form, FormProps, Image, Input, Modal, Radio, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Vector from "../../assets/Vector.png";
import Rectangle from "../../assets/Rectangle .jpg";
import register from "../../assets/register.json";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import uploadFile from "../../utils/upload";
import axiosInstance from "../../services/api.ts";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type FieldType = {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
};

const RegisterPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [form] = useForm();
  const handleOk = () => {
    setIsModalOpen(false);
    form.submit();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {

      if (fileList.length > 0) {
        const file = fileList[0].originFileObj as FileType;
        const url = await uploadFile(file);
        values.avatar = url;
      }

      await axiosInstance.post("/api/users", values);
      toast.success("Successfully registered");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      //Handle error softly
    } finally {
      setLoading(false);
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

      <div className="w-full md:w-1/2 flex flex-col justify-center pt-5 bg-white rounded-l-lg">
        <div className="mr-4">
          <div className="flex justify-center ml-20 items-center">
            <h1 className="flex justify-center mb-4 text-3xl md:text-7xl font-bold">Register </h1>
            <Lottie animationData={register} style={{ width: "100px", height: "100px" }} />
          </div>

          <span className="flex justify-center mb-4">Learn from top experts. Sign up for FLearn now!</span>
        </div>
        <div className="mb-6">
          <div className=" flex justify-center ">
            <Form
              form={form}
              name="basic"
              className="flex flex-col gap-1"
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }} // Set default role here
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "Please enter the correct email format!",
                  },
                  {
                    pattern: /^\S*$/,
                    message: "Email must not contain spaces!",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="mb-3"
              >
                <Input
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input your name!" },
                  {
                    min: 4,
                    message: "Name must be at least 4 characters!",
                  },
                  {
                    max: 20,
                    message: "Name must be at most 20 characters!",
                  },
                  //   {
                  //     pattern: /^[a-zA-Z0-9]*$/,
                  //     message: "Name must not contain any special characters!",
                  //   },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="mb-5"
              >
                <Input
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm "
                  placeholder="Name"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 6,
                    message: "Password must have at least 6 characters!",
                  },
                  {
                    pattern: /^\S*$/,
                    message: "Password must not contain space!",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="mb-5"
              >
                <Input.Password
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </Form.Item>

              <Form.Item<FieldType>
                name="role"
                rules={[{ required: true, message: "Please select your role!" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="mb-5"
              >
                <Radio.Group>
                  <Radio value="student">Student</Radio>
                  <Radio value="instructor">Instructor</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                valuePropName="checked"
                rules={[
                  {
                    required: true,
                    message: "Please agree with our policy",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Checkbox className="mt-2">Agree to Terms and Conditions</Checkbox>
                <span onClick={openModal} className="hover:cursor-pointer font-bold hover:text-red-400">
                  (See Policy)
                </span>
                <Modal title="Policy" open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
                  <p>This is where your policy content goes.</p>
                </Modal>
              </Form.Item>
              <Form.Item name="avatarUrl" rules={[{ required: true, message: "Please upload your Avartar" }]}>
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="mt-2 w-full shadow-xl hover:shadow-sky-600 bg-black"
                >
                  Create Account
                </Button>
              </Form.Item>
            </Form>
          </div>
          <span className="mt-4 block text-center">
            Do you already have an account?{" "}
            <strong>
              <Link to={"/login"} className="hover:cursor-pointer hover:text-red-400">
                Back to Sign in
              </Link>
            </strong>
          </span>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 pb-12 items-center justify-center">
        <div className="rounded-lg overflow-hidden w-[80%] shadow-pink-300 mt-20">
          <img className="shadow-xl rounded-xl w-full" src={Rectangle} alt="logo" />
        </div>
      </div>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            src: previewImage,
            onVisibleChange: (value) => {
              setPreviewOpen(value);
            },
          }}
        />
      )}
    </div>
  );
};

export default RegisterPage;