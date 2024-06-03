import { Button, Form, FormProps, Input } from "antd";
import { Link } from "react-router-dom";
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
    <div className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <img
          className="shadow-xl shadow-pink-300 rounded-xl"
          src="https://th.bing.com/th/id/OIG1.AGaZbxlA_0MPJqC3KzeN?w=270&h=270&c=6&r=0&o=5&pid=ImgGn&fbclid=IwZXh0bgNhZW0CMTAAAR2mjW6RtojaN9vEo4rqlabcTxGB8SgLyPDBFuYQkrjrtV6Y-grTpfAFNfU_aem_AeDCUfxM5_fs-2v7HvGAmbOqmKCoSm3yqxolCEq2L3VhfsTEpP6R4EchWpg36dMdIMwS0hSCc_V3GDRIrdhhWCxz"
          alt="logo"
          width={300}
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center p-20 bg-white rounded-l-lg shadow-left">
        <h1 className="flex justify-center mb-10 text-6xl">Login</h1>
        <div className="flex justify-center"><button className="flex justify-center items-center gap-4 bg-zinc-100 rounded-md px-12 py-3 shadow-xl hover:shadow-orange-200 w-1/2">
          <img
            src="https://p1.hiclipart.com/preview/209/923/667/google-logo-background-g-suite-google-pay-google-doodle-text-circle-line-area-png-clipart.jpg"
            alt="Google Logo"
            width={25}
          />
          <span>Login with Google</span>
        </button></div>
        
        <hr className="my-8 border-gray-300" />
        <div className="mt-6 flex justify-center">
          <Form 
            name="basic"
            className="space-y-6"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input.Password className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </Form.Item>

            <Link className="flex justify-center hover:text-green-600" to={""}>
              Forget Password
            </Link>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" className="w-full shadow-xl hover:shadow-sky-600">
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
      </div>
    </div>
  );
};

export default LoginPage;
