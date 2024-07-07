import React, { useState } from 'react';
import CustomButton from "../../components/CustomButton.tsx";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/api.ts";
import { toast } from "react-toastify";
import { paths } from "../../consts";

const VerifyToken: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [tokenExpired, setTokenExpired] = useState(false);

    const handleVerifyEmail = async () => {
        try {
            const response = await axiosInstance.post("/api/auth/verify-token", {
                token: params.token,
            });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (response.success) {
                toast.success("Verification Successfully");
                navigate(paths.LOGIN);
            }
        } catch (error) {
            if (error.message === 'Token is not valid.') {
                setTokenExpired(true);
            } else {
                //
            }
        }
    };

    const handleResendToken = async () => {
        try {
            const response = await axiosInstance.post("/api/auth/resend-token", {
                email: params.email, // Assumes that email is in the URL params, adjust if necessary
            });
            if (response.data.success) {
                toast.success("New token sent to your email.");
            }
        } catch (error) {
            //
        }
    };

    return (
        <div className="flex items-center justify-center flex-col">
            <h1 className="main_h1 my-5">Verify Token</h1>
            {!tokenExpired ? (
                <div className="mb-5">
                    <CustomButton
                        title="Verify Email"
                        width="100"
                        containerStyles="bg-red-500"
                        handleClick={handleVerifyEmail}
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center flex-col">
                    <p className="text-red-500 mb-3">Your token has expired. Do you want to resend a new token?</p>
                    <CustomButton
                        title="Resend Token"
                        width="100"
                        containerStyles="bg-blue-500"
                        handleClick={handleResendToken}
                    />
                </div>
            )}
        </div>
    );
};

export default VerifyToken;
