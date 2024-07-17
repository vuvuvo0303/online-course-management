import React, { useState, useEffect } from "react";
import { Button, Form, FormProps, Input, Modal, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Vector from "../../assets/Vector.png";
import Rectangle from "../../assets/Rectangle .jpg";
import { handleNavigateRole, login } from "../../services/auth";
import { toast } from "react-toastify";
import {
  API_CURRENT_LOGIN_USER,
  API_LOGIN_WITH_GOOGLE,
  API_REGISTER_WITH_GOOGLE,
  paths,
} from "../../consts";
import { GoogleLogin } from "@react-oauth/google";
import Lottie from "lottie-react";
import vutru from "../../assets/vutru.json";
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

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
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
      toast.success("Login successfully");
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
      toast.success("Registered and logged in successfully");
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
      handleRegisterWithGoogle(googleId)
      setIsModalVisible(false);
      localStorage.removeItem("token");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="flex min-h-screen relative">
        <img src={Vector} alt="" className="absolute bottom-8" />

        <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-20 bg-white rounded-l-lg">
          <div className="mr-6 ">
            <div className="flex justify-center items-center ml-16 ">
              <h1 className="flex justify-center mb-4 text-3xl md:text-7xl font-bold">
                Welcome
              </h1>
              <Lottie
                animationData={vutru}
                style={{ width: "100px", height: "100px" }}
              />
            </div>

            <span className="flex justify-center mb-4">
              Log in to become a part of FLearn
            </span>
          </div>

          <div className="mt-6 flex justify-end">
            <Form
              name="basic"
              className="space-y-2 w-full md:w-[80%]"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="pb-2">
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    {
                      type: "email",
                      message: "Please enter the correct email format!",
                    },
                    {
                      pattern: /^\S*$/,
                      message: "Password must not contain spaces!",
                    },
                  ]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className="mb-1"
                >
                  <Input className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters!",
                    },
                    {
                      pattern: /^\S*$/,
                      message: "Password must not contain spaces!",
                    },
                  ]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className="mb-1 mt-5"
                >
                  <Input.Password className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </Form.Item>
              </div>

              <div className="flex justify-center">
                <Link
                  className="md:mr-40 hover:text-green-600"
                  to={paths.FORGOT_PASSWORD}
                >
                  Forgot Password
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="w-full md:w-2/3 shadow-xl hover:shadow-sky-600 bg-black"
                  loading={loading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
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
          <div className="flex justify-center items-center mr-10">
            <hr className="my-8 border-gray-50 w-36" />
            <span className="text-center">
              <strong>Login</strong> with others
            </span>
            <hr className="my-8 border-gray-50 w-36" />
          </div>
          <div className="flex justify-center mr-10">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleLoginWithGoogle(credentialResponse.credential as string);
                localStorage.setItem("token", credentialResponse.credential as string);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <div className="rounded-lg overflow-hidden w-[80%] shadow-pink-300">
            <img
              className="shadow-xl rounded-xl w-full"
              src={Rectangle}
              alt="logo"
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
          {role === "instructor" && (
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
    </>
  );
};

export default LoginPage;
