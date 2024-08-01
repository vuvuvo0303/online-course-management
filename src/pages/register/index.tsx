import { Button, Form, FormProps, Image, Input, message, Radio, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useState, useEffect } from "react";
import Login2 from "../../assets/Login2.jpg";
import { useForm } from "antd/es/form/Form";
import axiosInstance from "../../services/axiosInstance.ts";
import Recaptcha from "../register/reCaptcha.tsx";
import { API_REGISTER, emailRules, passwordRules, paths, roles } from "../../consts";
import { Instructor } from "../../models";
import { getBase64, uploadFile } from "../../utils";
import { UploadButton } from "../../components";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [captchaVisible, setCaptchaVisible] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [role, setRole] = useState<string>("student");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({ role });
  }, [role, form]);

  const onFinish: FormProps<Instructor>["onFinish"] = async (values) => {
    if (!captchaVisible) {
      setCaptchaVisible(true);
      return;
    }

    setLoading(true);
    if (!captchaToken) {
      message.error("Please complete the CAPTCHA");
      setLoading(false);
      return;
    }

    if (values.role === "instructor" && fileList.length > 0) {
      const file = fileList[0].originFileObj as FileType;
      const url = await uploadFile(file);
      values.avatar = url;
    }

    await axiosInstance.post(API_REGISTER, { ...values, captchaToken });
    message.success("Successfully registered. Navigate in 2s");
    setTimeout(() => {
      navigate(paths.LOGIN);
    }, 2000);
    setLoading(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#18a5a7] via-[#ffe998] to-[#ffb330] relative">
      <div className="w-full md:w-1/2 flex flex-row bg-white rounded-lg shadow-lg overflow-hidden min-h-[650px] mb-[30px] mt-[30px]">
        <div className="w-1/2 flex flex-col justify-center p-4 md:p-8 bg-white rounded-lg">
          <div className="flex flex-col items-center mb-4">
            <h1 className="mb-2 text-2xl md:text-3xl font-bold text-center">
              Register
            </h1>
          </div>

          <span className="mb-4 text-center">
            Learn from top experts. Sign up for FLearn now!
          </span>
          <div className="mb-6">
            <div className="flex justify-center">
              <Form
                form={form}
                name="basic"
                className="flex flex-col gap-1"
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true, role }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={emailRules}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className="mb-3"
                >
                  <Input className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </Form.Item>

                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                    { min: 4, message: "Name must be at least 4 characters!" },
                    { max: 20, message: "Name must be at most 20 characters!" },
                  ]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className="mb-5"
                >
                  <Input className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={passwordRules}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className="mb-5"
                >
                  <Input.Password className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </Form.Item>

                <Form.Item
                  name="role"
                  rules={[
                    { required: true, message: "Please select your role!" },
                  ]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className="mb-5"
                >
                  <Radio.Group onChange={(e) => setRole(e.target.value)}>
                    <Radio value="student">Student</Radio>
                    <Radio value="instructor">Instructor</Radio>
                  </Radio.Group>
                </Form.Item>

                {role === roles.INSTRUCTOR && (
                  <>
                    <Form.Item
                      label="Video"
                      name="video"
                      rules={[
                        {
                          required: true,
                          message: "Please input your video link!",
                        },
                      ]}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      className="mb-5"
                    >
                      <Input className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " />
                    </Form.Item>

                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Please input your description!",
                        },
                      ]}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      className="mb-5"
                    >
                      <Input className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " />
                    </Form.Item>

                    <Form.Item
                      label="Phone Number"
                      name="phone_number"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number!",
                        },
                      ]}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      className="mb-5"
                    >
                      <Input className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " />
                    </Form.Item>

                    <Form.Item
                      name="avatarUrl"
                      rules={[
                        {
                          required: true,
                          message: "Please upload your Avatar",
                        },
                      ]}
                    >
                      <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {fileList.length >= 1 ? null : <UploadButton />}
                      </Upload>
                    </Form.Item>
                  </>
                )}

                {captchaVisible && <Recaptcha onVerify={setCaptchaToken} />}

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
                <Link
                  to={paths.LOGIN}
                  className="hover:cursor-pointer hover:text-blue-400"
                >
                  Back to Sign in
                </Link>
              </strong>
            </span>
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
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={Login2}
            alt="Vector"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
