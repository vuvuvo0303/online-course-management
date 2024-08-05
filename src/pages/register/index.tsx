import {
  Form,
  FormProps,
  Image,
  message,
  Radio,
  RadioChangeEvent,
  Upload,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useState, useEffect } from "react";
import Register1 from "../../assets/Register1.jpg";
import { useForm } from "antd/es/form/Form";
import { axiosInstance } from "../../services";
import {
  API_REGISTER,
  avatarUrlRules,
  paths,
  roleRules,
  roles,
} from "../../consts";
import { Instructor } from "../../models";
import { getBase64, uploadFile } from "../../utils";
import {
  BackButton,
  ButtonFormItem,
  DescriptionFormItem,
  EmailFormItem,
  NameFormItem,
  PasswordFormItem,
  PhoneNumberFormItem,
  UploadButton,
  VideoFormItem,
} from "../../components";
import ResponseData from "../../models/ResponseData.ts";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>(roles.STUDENT);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({ role });
  }, [role, form]);

  const onFinish: FormProps<Instructor>["onFinish"] = async (values) => {
    setLoading(true);

    if (values.role === roles.INSTRUCTOR && fileList.length > 0) {
      const file = fileList[0].originFileObj as FileType;
      const url = await uploadFile(file);
      values.avatar = url;
    }

    try {
      const response: ResponseData = await axiosInstance.post(API_REGISTER, { ...values });
      message.success("Successfully registered. Please check your email to login");
      if (response.success) {
        setTimeout(() => {
          navigate(paths.LOGIN);
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
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

  const handleRoleChange = (e: RadioChangeEvent) => {
    setRole(e.target.value);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#fffcce] to-[#1e5b53] relative">
      <BackButton path={paths.HOME} />
      <div className="w-full md:w-7/12 flex flex-row bg-white rounded-lg shadow-lg overflow-hidden min-h-[500px] mb-[30px] mt-[30px]">
        <div className="w-1/2 flex flex-col justify-center p-4 md:p-8 bg-white rounded-lg">
          <div className="flex flex-col items-center mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-center">
              Register
            </h1>
          </div>

          <span className="text-center mb-3">
            Step into success with FLearn. Join us today!
          </span>

          <div className="mb-3">
            <div className="flex justify-center">
              <Form
                form={form}
                name="basic"
                className="flex flex-col gap-1"
                style={{ maxWidth: 600, overflow: "hidden" }}
                initialValues={{ remember: true, role }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <EmailFormItem />
                <NameFormItem />
                <PasswordFormItem />

                <Form.Item
                  name="role"
                  rules={roleRules}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className="mb-3"
                >
                  <Radio.Group onChange={handleRoleChange}>
                    <Radio value={roles.STUDENT}>Student</Radio>
                    <Radio value={roles.INSTRUCTOR}>Instructor</Radio>
                  </Radio.Group>
                </Form.Item>

                {role === roles.INSTRUCTOR && (
                  <>
                    <VideoFormItem />
                    <DescriptionFormItem />
                    <PhoneNumberFormItem />
                    <Form.Item name="avatarUrl" label="Image" rules={avatarUrlRules} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
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

                <Form.Item
                  wrapperCol={{ span: 24 }}
                  style={{ marginBottom: "0px" }}
                >
                  <ButtonFormItem loading={loading} buttonText="Register" htmlType="submit" />
                </Form.Item>
              </Form>
            </div>
            <span className="block text-center">
              Do you already have an account?
            </span>
            <span className="block text-center mt-1">
              <strong>
                <Link
                  to={paths.LOGIN}
                  className="hover:cursor-pointer hover:text-blue-400"
                >
                  Back to Sign In
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
        <div
          className="w-1/2 flex items-center justify-center"
          style={{ overflow: "hidden" }}
        >
          <img
            src={Register1}
            alt="Vector"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
