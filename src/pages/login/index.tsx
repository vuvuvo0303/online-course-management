import React, { useState, useEffect } from "react";
import { Button, Form, FormProps, Input, message, Modal, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Login5 from "../../assets/Login5.jpg";
import { handleNavigateRole, login } from "../../services/auth";
import {
  API_CURRENT_LOGIN_USER,
  API_LOGIN_WITH_GOOGLE,
  API_REGISTER_WITH_GOOGLE,
  paths, roles,
} from "../../consts";
import { GoogleLogin } from "@react-oauth/google";
// import Lottie from "lottie-react";
// import vutru from "../../assets/vutru.json";
import axiosInstance from "../../services/axiosInstance.ts";

type FieldType = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem("user");
  const [additionalFields, setAdditionalFields] = useState({
    description: "",
    phone_number: "",
    video: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      navigate(paths.HOME);
    }
  }, [navigate, user]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { email, password } = values;
    setLoading(true);
    const authResult = await login(email, password);
    if (authResult && "token" in authResult) {
      const { token } = authResult;
      localStorage.setItem("token", token);
      await handleNavigateRole(token, navigate);
    }
    setLoading(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleLoginWithGoogle = async (googleId: string) => {
    try {
      const responseLogin = await axiosInstance.post(API_LOGIN_WITH_GOOGLE, {
        google_id: googleId,
      });
      localStorage.setItem("token", responseLogin.data.token);
      const currentUser = await axiosInstance.get(API_CURRENT_LOGIN_USER);
      localStorage.setItem("user", JSON.stringify(currentUser.data));
      message.success("Login successfully");
      navigate(paths.HOME);
    } catch (error) {
      setIsModalVisible(true);
    }
  };

  const handleRegisterWithGoogle = async (googleId: string) => {
    try {
      await axiosInstance.post(API_REGISTER_WITH_GOOGLE, {
        google_id: googleId,
        role: role,
        ...additionalFields,
      });
      const responseLogin = await axiosInstance.post(API_LOGIN_WITH_GOOGLE, {
        google_id: googleId,
      });
      localStorage.setItem("token", responseLogin.data.token);
      const currentUser = await axiosInstance.get(API_CURRENT_LOGIN_USER);
      localStorage.setItem("user", JSON.stringify(currentUser.data));
      message.success("Registered and logged in successfully");
      navigate(paths.HOME);
    } catch (error) {
      console.log(error);
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
      handleRegisterWithGoogle(googleId);
      setIsModalVisible(false);
      localStorage.removeItem("token");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#18a5a7] via-[#ffe998] to-[#ffb330] relative">
      <div className="w-full md:w-1/2 flex flex-row bg-white rounded-lg shadow-lg overflow-hidden min-h-[650px] mb-[30px] mt-[30px]">
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={Login5}
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
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter the correct email format!",
                },
                { pattern: /^\S*$/, message: "Email must not contain spaces!" },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mx-auto" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
                {
                  pattern: /^\S*$/,
                  message: "Password must not contain spaces!",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input.Password className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mx-auto" />
            </Form.Item>
            <div className="flex justify-center">
              <Link
                className="hover:text-green-600 mt-2"
                to={paths.FORGOT_PASSWORD}
              >
                Forgot Password
              </Link>
            </div>
            <Form.Item>
              <div className="flex justify-center">
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="w-2/3 shadow-xl hover:shadow-sky-600 bg-black"
                  loading={loading}
                >
                  Login
                </Button>
              </div>
            </Form.Item>
          </Form>
          <span className="mt-4 block text-center">
            Do you have an account?{" "}
            <strong>
              <Link
                to={paths.REGISTER}
                className="hover:cursor-pointer hover:text-red-400"
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
          <div className="flex justify-center mt-6">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleLoginWithGoogle(credentialResponse.credential as string);
                localStorage.setItem(
                  "token",
                  credentialResponse.credential as string
                );
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Select Role"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form>
          <Form.Item label="Role" required>
            <Select onChange={handleRoleChange}>
              <Select.Option value="student">Student</Select.Option>
              <Select.Option value="instructor">Instructor</Select.Option>
            </Select>
          </Form.Item>
          {role === roles.INSTRUCTOR && (
            <>
              <Form.Item label="Description" required>
                <Input
                  name="description"
                  value={additionalFields.description}
                  onChange={handleAdditionalFieldsChange}
                />
              </Form.Item>
              <Form.Item label="Phone Number" required>
                <Input
                  name="phone_number"
                  value={additionalFields.phone_number}
                  onChange={handleAdditionalFieldsChange}
                />
              </Form.Item>
              <Form.Item label="Video URL" required>
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
