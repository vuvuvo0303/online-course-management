import React, { useState, useEffect } from "react";
import { Button, Form, FormProps, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Vector from "../../assets/Vector.png";
import Rectangle from "../../assets/Rectangle .jpg";
import { login } from "../../services/auth";
import { removePassword } from "../../utils/validHelper";
import { toast } from "react-toastify";
import {
  API_CURRENT_LOGIN_USER,
  API_GET_USERS,
  API_LOGIN_WITH_GOOGLE,
  API_REGISTER_WITH_GOOGLE,
  paths
} from "../../consts";
import { GoogleLogin } from "@react-oauth/google";
import Lottie from "lottie-react";
import vutru from "../../assets/vutru.json";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../services/api.ts";
import { toggleToast } from "react-toastify/dist/core/store";

type FieldType = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [accountLockedMsg, setAccountLockedMsg] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate(paths.HOME);
    }
  }, [navigate]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { email, password } = values;
    const authResult = await login(email, password);
    if (authResult && "status" in authResult) {
      setAccountLockedMsg(authResult.status);
      toast.error(authResult.status);
    } else if (authResult && "user" in authResult) {
      const { user } = authResult;
      const userWithoutPassword = removePassword(user);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      switch (user.role) {
        case "student":
          navigate(paths.HOME);
          break;
        case "instructor":
          navigate(paths.INSTRUCTOR_HOME);
          break;
        default:
          navigate(paths.HOME);
          break;
      }
      toast.success("Login successfully");
    } else {
      toast.error("Login failed");
    }
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
      if (error.status === 409) {
        // Account does not exist, call the registration API
        try {
          const responseRegister = await axiosInstance.post(API_REGISTER_WITH_GOOGLE, {
            google_id: googleId,
            role: 'student'
          });
          console.log(responseRegister);
          const responseLogin = await axiosInstance.post(API_LOGIN_WITH_GOOGLE, {
            google_id: googleId,
          })
          localStorage.setItem("token", responseLogin.data.token);
          const currentUser = await axiosInstance.get(API_CURRENT_LOGIN_USER);
          localStorage.setItem("user", JSON.stringify(currentUser.data));
          toast.success("Registered and logged in successfully");
          navigate(paths.HOME);
        } catch (registerError) {
          // Handle registration error
        }
      } else {
        // Handle other errors accordingly
      }
    }
  };


  return (
    <>
      <div className="flex min-h-screen relative">
        <img src={Vector} alt="" className="absolute bottom-8" />

        <div className="w-full md:w-1/2 flex flex-col justify-center a p-4 md:p-20 bg-white rounded-l-lg">
          <div className="mr-6 ">
            <div className="flex justify-center items-center ml-16 ">
              <h1 className="flex justify-center mb-4 text-3xl md:text-7xl font-bold">Welcome</h1>
              <Lottie animationData={vutru} style={{ width: "100px", height: "100px" }} />
            </div>

            <span className="flex justify-center mb-4">Log in to become a part of FLearn</span>
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
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter the correct email format!" },
                    { pattern: /^\S*$/, message: "Password must not contain spaces!" },
                  ]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className="mb-1"
                >
                  <Input
                    placeholder="Email"
                    className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                    { min: 6, message: "Password must be at least 6 characters!" },
                    { pattern: /^\S*$/, message: "Password must not contain spaces!" },
                  ]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className="mb-1 mt-5"
                >
                  <Input.Password
                    placeholder="Password"
                    className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </Form.Item>
              </div>

              {accountLockedMsg && <div className="text-red-500 text-sm">{accountLockedMsg}</div>}

              <div className="flex justify-center">
                <Link className="md:mr-40 hover:text-green-600" to={paths.FORGOT_PASSWORD}>
                  Forget Password
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="w-full md:w-2/3 shadow-xl hover:shadow-sky-600 bg-black"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
          <span className="mt-4 block text-center">
            Do you have an account?{" "}
            <strong>
              <Link to="/register" className="hover:cursor-pointer hover:text-red-400">
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
                console.log(credentialResponse);
                handleLoginWithGoogle(credentialResponse.credential as string);
                const credentialResponseDecoded = jwtDecode(credentialResponse.credential as string);

                console.log(credentialResponseDecoded);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <div className="rounded-lg overflow-hidden w-[80%] shadow-pink-300">
            <img className="shadow-xl rounded-xl w-full" src={Rectangle} alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

