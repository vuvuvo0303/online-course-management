import React, { useState } from 'react';
import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/api.ts";
import { toast } from "react-toastify";
import { API_RESEND_TOKEN, API_VERIFY_TOKEN, paths } from "../../consts";

const VerifyToken: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [tokenExpired, setTokenExpired] = useState(false);
    const [isLoadingVerify, setIsLoadingVerify] = useState(false);
    const [isLoadingResend, setIsLoadingResend] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [email, setEmail] = useState("");

    const handleVerifyEmail = async () => {
        setIsLoadingVerify(true);
        try {
            const response = await axiosInstance.post(API_VERIFY_TOKEN, {
                token: params.token,
            });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (response.success) {
                toast.success("Verification Successfully");
                navigate(paths.LOGIN);
            }
        } catch (error) {
            if (error.message && !error.success) {
                setTokenExpired(true);
            } else {
                //
            }
        } finally {
            setIsLoadingVerify(false);
        }
    };

    const handleResendToken = async () => {
        setIsLoadingResend(true);
        try {
            const response = await axiosInstance.post(API_RESEND_TOKEN, {
                email: email,
            });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (response.success) {
                toast.success("New token sent to your email.");
                setTokenExpired(false);
                setResendSuccess(true);
            }
        } catch (error) {
            //
        } finally {
            setIsLoadingResend(false);
        }
    };

    return (
        <div className="flex items-center justify-center flex-col">
            <h1 className="main_h1 my-5">Verify Token</h1>
            {!tokenExpired ? (
                <div className="mb-5">
                    <Button
                        type="primary"
                        loading={isLoadingVerify}
                        onClick={handleVerifyEmail}
                    >
                        {isLoadingVerify ? "Verifying..." : "Verify Email"}
                    </Button>
                </div>
            ) : (
                <div className="flex items-center justify-center flex-col">
                    {!resendSuccess && (
                        <div className="flex flex-col items-center">
                            <p className="text-red-500 mb-3">Your token has expired. Do you want to resend a new token?</p>
                            <Form layout="inline" onFinish={handleResendToken}>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                                >
                                    <Input
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={isLoadingResend}
                                    >
                                        {isLoadingResend ? "Resending..." : "Resend Token"}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VerifyToken;
