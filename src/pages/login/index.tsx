import { Button, Form, FormProps, Input } from "antd";
import { Link } from "react-router-dom";
import Vector from "../../assets/Vector.png";
import Ractangle from "../../assets/Rectangle .jpg";

type FieldType = {
  username?: string;
  password?: string;
};

const LoginPage = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex min-h-screen relative">
      <img src={Vector} alt="" className="absolute bottom-8" />

      <div className="w-full md:w-1/2 flex flex-col justify-center a p-4 md:p-20 bg-white rounded-l-lg">
        <div className="mr-6 ">
          <h1 className="flex justify-center mb-4 text-3xl md:text-7xl font-bold">Welcome</h1>
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
              {" "}
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="mb-1"
              >
                <Input className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="mb-1"
              >
                <Input.Password className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </Form.Item>
            </div>

            <div className="flex justify-center">
              <Link className="md:mr-40 hover:text-green-600" to={""}>
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
            <Link to={"/register"} className="hover:cursor-pointer hover:text-red-400">
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
          <button className="flex justify-center items-center gap-4 border border-black rounded-md px-12 py-3 shadow-xl hover:shadow-orange-200 w-full md:w-2/3 bg-transparent">
            <img src="https://www.pngall.com/wp-content/uploads/13/Google-Logo.png" alt="Google Logo" width={25} />
            <span>Login with Google</span>
          </button>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <div className="rounded-lg overflow-hidden w-[80%] shadow-pink-300">
          <img className="shadow-xl rounded-xl w-full" src={Ractangle} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
