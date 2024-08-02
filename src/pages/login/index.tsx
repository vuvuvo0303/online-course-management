import { useState } from "react";
import { Button, Form, FormProps, Input, Modal, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Login4 from "../../assets/Login4.jpg";
import { paths, roles } from "../../consts";
import { GoogleLogin } from "@react-oauth/google";
import {
  handleNavigateRole,
  login,
  loginWithGoogle,
  registerWithGoogle,
} from "../../services";
import {
  EmailFormItem,
  LoginButtonItem,
  PasswordFormItem,
} from "../../components";
import { LoginFieldType } from "../../models/Auth";
import { LeftOutlined } from "@ant-design/icons";

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

  const onFinish: FormProps<LoginFieldType>["onFinish"] = async (values) => {
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

  const handleModalOk = () => {
    const googleId = localStorage.getItem("token");
    if (googleId) {
      registerWithGoogle(googleId, role, additionalFields, navigate);
      setIsModalVisible(false);
      localStorage.removeItem("token");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
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

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#fffcce] to-[#1e5b53] relative">
      <Button
        type="link"
        icon={<LeftOutlined />}
        onClick={() => navigate(paths.HOME)}
        className="absolute top-4 left-4 text-blue-500 bg-white bg-opacity-70 font-bold py-2 px-4 rounded-lg inline-flex items-center"
      >
        Home
      </Button>

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
            <LoginButtonItem loading={loading} />
          </Form>
          <span className="mt-4 block text-center">
            Do you have an account?{" "}
            <strong>
              <Link
                to={paths.REGISTER}
                className="hover:cursor-pointer hover:text-blue-600"
              >
                Sign up here
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
        <Form>
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
              >
                <Input
                  placeholder="Description"
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
                  placeholder="Phone Number"
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
                <Input
                  name="video"
                  value={additionalFields.video}
                  onChange={handleAdditionalFieldsChange}
                />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default LoginPage;
