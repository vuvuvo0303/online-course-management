import React, { useState } from "react";
import { Button, Form, FormProps, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Vector from "../../../assets/Vector.png";
import Rectangle from "../../../assets/Rectangle .jpg";
import Lottie from "lottie-react";
import {handleNavigateRole, login} from "../../../services/auth.ts";
import vutru from "../../../assets/vutru.json";

type FieldType = {
    email: string;
    password: string;
};

const AdminLoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false); // Add loading state


    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        const { email, password } = values;
        setLoading(true); // Set loading to true when login starts
        const authResult = await login(email, password);
            if (authResult && "token" in authResult) {
            const { token } = authResult;
            localStorage.setItem("token", token);
            await handleNavigateRole(token, navigate);
        }
        setLoading(false); // Set loading to false when login ends
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="flex min-h-screen relative">
            <img src={Vector} alt="" className="absolute bottom-8" />
            <div className="w-full md:w-1/2 flex flex-col justify-center a p-4 md:p-20 bg-white rounded-l-lg">
                <div className="mr-6">
                    <div className="flex justify-center items-center ml-16">
                        <h1 className="flex justify-center mb-4 text-3xl md:text-7xl font-bold">Welcome Admin</h1>
                        <Lottie animationData={vutru} style={{ width: "100px", height: "100px" }} />
                    </div>
                    <span className="flex justify-center mb-4">Log in to manage FLearn</span>
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
                                    { type: "email", message: "Please enter the correct email format!" },
                                    { pattern: /^\S*$/, message: "Password must not contain spaces!" },
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
                                    { min: 6, message: "Password must be at least 6 characters!" },
                                    { pattern: /^\S*$/, message: "Password must not contain spaces!" },
                                ]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                className="mb-1 mt-5"
                            >
                                <Input.Password className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                className="w-full md:w-2/3 shadow-xl hover:shadow-sky-600 bg-black"
                                loading={loading} // Add loading property
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
            <div className="hidden md:flex w-1/2 items-center justify-center">
                <div className="rounded-lg overflow-hidden w-[80%] shadow-pink-300">
                    <img className="shadow-xl rounded-xl w-full" src={Rectangle} alt="logo" />
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
