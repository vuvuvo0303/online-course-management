import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance.ts";
import { API_RESEND_TOKEN, API_VERIFY_TOKEN, paths } from "../../consts";
import ResponseData from 'models/ResponseData.ts';

const VerifyToken: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [tokenExpired, setTokenExpired] = useState(false);
    const [isLoadingResend, setIsLoadingResend] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const handleVerifyEmail = async () => {
            try {
                const response: ResponseData = await axiosInstance.post(API_VERIFY_TOKEN, {
                    token: params.token,
                });
                if (response.success) {
                    message.success("Verification Successfully");
                    navigate(paths.LOGIN);
                }
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                if (error.message && !error.success) {
                    setTokenExpired(true);
                } else {
                    //
                }
            }
        };
        handleVerifyEmail();
    }, []);

    const handleResendToken = async () => {
        setIsLoadingResend(true);
        try {
            const response = await axiosInstance.post(API_RESEND_TOKEN, {
                email: email,
            });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (response.success) {
                message.success("New token sent to your email.");
                setTokenExpired(false);
                setResendSuccess(true);
                setTimeout(() => {
                    navigate(paths.HOME);
                }, 2000)
            }
        } catch (error) {
            //
        } finally {
            setIsLoadingResend(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/l2.jpg)' }}>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-6">Verify Email</h1>
                {!tokenExpired ? (
                    <div className="mb-5 text-center">
                    </div>
                ) : (
                    <div className="text-center">
                        {!resendSuccess && (
                            <div className="flex flex-col items-center">
                                <p className="text-red-500 mb-3">Your token has expired. Do you want to resend a new token?</p>
                                <Form layout="vertical" onFinish={handleResendToken} className="w-full">
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Please input your email!' },
                                            { type: 'email', message: 'Please enter a valid email!' }
                                        ]}
                                    >
                                        <Input
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={isLoadingResend}
                                            className="w-full"
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
        </div>
    );
};

export default VerifyToken;
