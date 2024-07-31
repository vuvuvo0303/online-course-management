import { useState } from "react";
import { Form, Input, Button } from "antd";
import { changePassword } from "../../../services/users";
import { CheckCircleOutlined } from "@ant-design/icons";
import changepass from "../../../assets/changepass.png";

interface ValuesChangePassword {
  oldPassword: string;
  newPassword: string;
}

const ChangePassword = () => {
  const [validations, setValidations] = useState({
    oldPassword: false,
    newPassword: {
      minLength: false,
    },
    confirmPassword: false,
  });

  const validateOldPassword = (password: string) => {
    setValidations((prev) => ({
      ...prev,
      oldPassword: password?.length >= 6,
    }));
  };

  const validateNewPassword = (password: string) => {
    const newValidations = {
      minLength: password?.length >= 6,
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password),
      noSpace: !/\s/.test(password),
    };
    setValidations((prev) => ({
      ...prev,
      newPassword: newValidations,
    }));
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    newPassword: string
  ) => {
    setValidations((prev) => ({
      ...prev,
      confirmPassword: confirmPassword === newPassword,
    }));
  };

  const onFinish = (values: ValuesChangePassword) => {
    changePassword(values);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center">
      <div className="w-full lg:w-2/3 py-8 flex justify-center">
        <div>
          <div className="flex justify-center mb-6">
            <span className="text-5xl font-bold text-center w-full">
              Change Password
            </span>
          </div>
          <div className="flex justify-center">
            <Form
              name="change_password"
              onFinish={onFinish}
              layout="vertical"
              className="w-80"
            >
              <div className="mb-2 ml-3 flex gap-2">
                <label htmlFor="oldPassword" className="font-bold">
                  Old Password
                </label>
                {validations.oldPassword && (
                  <CheckCircleOutlined style={{ color: "#1aff1a" }} />
                )}
              </div>
              <Form.Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your old password!",
                  },

                  {
                    validator: (_, value) => {
                      validateOldPassword(value);
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter Old Password"
                  className="h-12"
                />
              </Form.Item>
              <div className="mb-2 ml-3 flex gap-2">
                <label htmlFor="newPassword" className="font-bold">
                  New Password
                </label>
                {Object.values(validations.newPassword).every(Boolean) && (
                  <CheckCircleOutlined style={{ color: "#1aff1a" }} />
                )}
              </div>
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },

                  {
                    validator: (_, value) => {
                      validateNewPassword(value);
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter New Password"
                  className="h-12"
                />
              </Form.Item>
              <div className="pb-5 flex flex-col">
                <div className="flex items-center gap-3">
                  <span
                    className={`p-1 inline-block rounded-full ${
                      validations.newPassword.minLength
                        ? "bg-green-400"
                        : "bg-stone-400"
                    }`}
                  ></span>
                  <span
                    className={
                      validations.newPassword.minLength
                        ? "text-green-400"
                        : "text-stone-400"
                    }
                  >
                    Minimum characters 6
                  </span>
                </div>
              </div>
              <div className="mb-2 ml-3 flex gap-2">
                <label htmlFor="confirmPassword" className="font-bold">
                  Confirm Password
                </label>
                {validations.confirmPassword && (
                  <CheckCircleOutlined style={{ color: "#1aff1a" }} />
                )}
              </div>
              <Form.Item
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      validateConfirmPassword(
                        value,
                        getFieldValue("newPassword")
                      );
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Enter Confirm New Password"
                  className="h-12"
                />
              </Form.Item>
              <Form.Item>
                <div className="mt-6">
                  <Button
                    style={{ color: "white" }}
                    type="primary"
                    htmlType="submit"
                    block
                    className="h-12"
                  >
                    Change Password
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3 bg-amber-50 flex flex-col justify-between min-h-screen">
        <div className="flex justify-center mb-8 lg:mb-16">
          <div className="flex flex-col text-center lg:text-left">
            <span className="text-3xl font-bold mt-20">Don’t worry,</span>
            <span className="text-3xl font-bold">we’ll help you</span>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end h-full">
          <img
            src={changepass}
            className="w-full lg:w-2/3 h-auto"
            alt="Change Password Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
