import { useEffect, useState, useRef } from "react";
import { Form, Input, Modal, Select, Upload, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Login4 from "../../assets/Login4.jpg";
import { paths, roles } from "../../consts";
import {
  handleNavigateRole,
  login,
  loginWithGoogle,
  registerWithGoogle,
} from "../../services";
import { getBase64, uploadFile } from "../../utils";
import type { FormInstance, GetProp, UploadFile, UploadProps } from "antd";
import {
  BackButton,
  ButtonFormItem,
  EmailFormItem,
  PasswordFormItem,
} from "../../components";
import { LoginFieldType } from "../../models/Auth";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [additionalFields, setAdditionalFields] = useState({
    description: "",
    phone_number: "",
    video: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [role, setRole] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const formRef = useRef<FormInstance>(null);
  const modalFormRef = useRef<FormInstance>(null);

  const onFinish = async (values: LoginFieldType) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const authResult = await login(email, password);
      if (authResult && "token" in authResult) {
        const { token } = authResult;
        localStorage.setItem("token", token);
        await handleNavigateRole(token, navigate);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdditionalFieldsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setAdditionalFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
  };

  const handleModalOk = async () => {
    try {
      await modalFormRef.current?.validateFields();
      const googleId = localStorage.getItem("token");
      if (googleId) {
        await registerWithGoogle(googleId, role, additionalFields, navigate);
        setIsModalVisible(false);
        localStorage.removeItem("token");
        formRef.current?.resetFields();
        setFileList([]);
        setAdditionalFields({
          description: "",
          phone_number: "",
          video: "",
        });
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);

    formRef.current?.resetFields();
    setFileList([]);
    setAdditionalFields({
      description: "",
      phone_number: "",
      video: "",
    });
  };

  const renderGoogleLogin = () => (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        loginWithGoogle(
          credentialResponse.credential as string,
          navigate,
          setIsModalVisible
        );
        localStorage.setItem("token", credentialResponse.credential as string);
      }}
    />
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[newFileList.length - 1].originFileObj as File;
      setUploading(true);
      try {
        const videoURL = await uploadFile(file);
        setAdditionalFields((prevFields) => ({
          ...prevFields,
          video: videoURL,
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      setAdditionalFields((prevFields) => ({
        ...prevFields,
        video: "",
      }));
    }
  };

  const beforeUpload = (file: File) => {
    console.log(file);
    return false;
  };

  useEffect(() => {
    return cleanup;
  }, [additionalFields.video]);

  const cleanup = () => {
    if (additionalFields.video) {
      URL.revokeObjectURL(additionalFields.video);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#fffcce] to-[#1e5b53] relative">
      <BackButton path={paths.HOME} />
      <div className="w-full md:w-1/2 flex flex-row bg-white rounded-lg shadow-lg overflow-hidden min-h-[650px] mb-[30px]">
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={Login4}
            alt="Vector"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center p-4 md:p-8 bg-white rounded-lg">
          <div className="flex flex-col items-center mb-4">
            <h1 className="mb-2 text-2xl md:text-3xl font-bold text-center">
              Welcome
            </h1>
            <span className="text-sm md:text-base text-center">
              Log in to become a part of FLearn
            </span>
          </div>
          <Form
            ref={formRef}
            name="basic"
            className="space-y-4 w-full"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <EmailFormItem />
            <PasswordFormItem />
            <div className="flex justify-center">
              <Link
                className="hover:text-blue-600 mt-2"
                to={paths.FORGOT_PASSWORD}
              >
                Forgot Password
              </Link>
            </div>
            <ButtonFormItem
              loading={loading}
              buttonText="Login"
              htmlType="submit"
            />
          </Form>
          <span className="mt-4 block text-center">
            Don't have an account yet?{" "}
            <strong>
              <Link
                to={paths.REGISTER}
                className="hover:cursor-pointer hover:text-blue-600"
              >
                Sign up here!
              </Link>
            </strong>
          </span>
          <div className="flex justify-center items-center mt-6">
            <hr className="border-gray-300 w-1/3" />
            <span className="text-center mx-2">or</span>
            <hr className="border-gray-300 w-1/3" />
          </div>
          <div className="flex justify-center mt-6">{renderGoogleLogin()}</div>
        </div>
      </div>
      <Modal
        title="Select Role"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form ref={modalFormRef}>
          <Form.Item
            label="Role"
            required
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Select onChange={handleRoleChange}>
              <Select.Option value="student">Student</Select.Option>
              <Select.Option value="instructor">Instructor</Select.Option>
            </Select>
          </Form.Item>
          {role === roles.INSTRUCTOR && (
            <>
              <Form.Item
                label="Description"
                required
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Input
                  placeholder="Enter Description"
                  name="description"
                  value={additionalFields.description}
                  onChange={handleAdditionalFieldsChange}
                />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                required
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Enter Phone Number"
                  name="phone_number"
                  value={additionalFields.phone_number}
                  onChange={handleAdditionalFieldsChange}
                />
              </Form.Item>
              <Form.Item
                label="Video URL"
                required
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={beforeUpload}
                  showUploadList={{ showRemoveIcon: true }}
                  customRequest={({ file, onSuccess, onError }) => {
                    setUploading(true);
                    uploadFile(file as File)
                      .then((url) => {
                        onSuccess?.(url);
                        setUploading(false); // End uploading
                      })
                      .catch((error) => {
                        onError?.(error);
                        setUploading(false); // End uploading
                      });
                  }}
                >
                  {fileList.length < 1 && !uploading && <div>Upload</div>}
                  {uploading && <div>Uploading...</div>}
                </Upload>

                {additionalFields.video && (
                  <video width="320" height="240" controls>
                    <source src={additionalFields.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
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
    </div>
  );
};

export default LoginPage;
