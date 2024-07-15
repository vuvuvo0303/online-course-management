import React, { useState } from "react";
import { Button, Form, FormProps, Input } from "antd";
import { useNavigate } from "react-router-dom";
// import Vector from "../../../assets/Vector.png";
import Login from "../../../assets/Login.png";
import { toast } from "react-toastify";
// import Lottie from "lottie-react";
import { login } from "../../../services/auth.ts";
import { paths } from "../../../consts";
// import vutru from "../../../assets/vutru.json";
import axiosInstance from "../../../services/axiosInstance.ts";

type FieldType = {
  email: string;
  password: string;
};

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserData = async (token: string) => {
    const response = await axiosInstance.get("/api/auth");
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(response.data));
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { email, password } = values;
    setLoading(true);
    const authResult = await login(email, password);
    if (authResult && "token" in authResult) {
      const { token } = authResult;
      localStorage.setItem("token", token);
      await fetchUserData(token);
      navigate(paths.ADMIN_HOME);
      toast.success("Login successfully");
    }
    setLoading(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#a7e05f] to-[#12ab97]">
      <div className="flex w-10/12 max-w-5xl rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-4/10 flex flex-col justify-center bg-white p-8 md:p-16">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Welcome back, Admin!
            </h1>
            {/* <Lottie
              animationData={vutru}
              style={{ width: "100px", height: "100px" }}
            /> */}
          </div>
          <span className="flex justify-center mb-4">
            Log in to manage FLearn
          </span>
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
              style={{ marginBottom: "10px", height: "80px" }}
            >
              <Input
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ width: "100%" }}
              />
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
              style={{ marginTop: "20px", height: "100px" }}
            >
              <Input.Password
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full shadow-xl hover:shadow-sky-600 bg-black"
                loading={loading}
                disabled={loading}
                aria-label="Login Button"
                style={{ width: "100%" }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="hidden md:flex w-6/10 items-center justify-center bg-gradient-to-r from-[#a7e05f] to-[#12ab97]">
          <img
            className="w-full h-full object-cover"
            src={Login}
            alt="Login Visual"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
