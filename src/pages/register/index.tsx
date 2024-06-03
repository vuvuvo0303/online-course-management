import { Button, Checkbox, Form, FormProps, Image, Input, Modal, Upload } from "antd";
import { Link } from "react-router-dom";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type FieldType = {
  username?: string;
  email?: string;
  phonenumber?: string;
  password?: string;
  avatar?: string;
  policy?: string;
};

const RegisterPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const openModal = ()=>{
    setIsModalOpen(true)
  }
 

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <img className="shadow-xl shadow-pink-300 rounded-xl"
          src="https://th.bing.com/th/id/OIG1.AGaZbxlA_0MPJqC3KzeN?w=270&h=270&c=6&r=0&o=5&pid=ImgGn&fbclid=IwZXh0bgNhZW0CMTAAAR2mjW6RtojaN9vEo4rqlabcTxGB8SgLyPDBFuYQkrjrtV6Y-grTpfAFNfU_aem_AeDCUfxM5_fs-2v7HvGAmbOqmKCoSm3yqxolCEq2L3VhfsTEpP6R4EchWpg36dMdIMwS0hSCc_V3GDRIrdhhWCxz"
          alt="logo"
          width={300}
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center p-8 bg-white rounded-l-lg shadow-left">
        <h1 className="flex justify-center  mt-6 text-5xl ">Register</h1>

        <div className="mt-6 flex justify-center ">
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
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </Form.Item>
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
            <Form.Item
              label="Phone Number"
              name="phonenumber"
              rules={[{ required: true, message: "Please input your Phone Number!" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                type="Number"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="Avatar"
              name="avatar"
              rules={[{ required: true, message: "Please upload your Avatar!" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item<FieldType>
              name="policy"
              valuePropName="checked"
              rules={[{ required: true, message: "Please accept Policy!" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Checkbox>Agree to Terms and Conditions</Checkbox>
              <span onClick={openModal} className="hover:cursor-pointer font-bold hover:text-red-400 ">(See Policy)</span>
              <Modal title="Policy" open={isModalOpen} onOk={handleOk} ></Modal>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" className="w-full shadow-xl hover:shadow-sky-600 ">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
        <span className="mt-4 block text-center">
          Have An Account?{" "}
          <strong>
            <Link to={"/login"} className="hover:cursor-pointer hover:text-red-400">Sign In here</Link>
          </strong>
        </span>
      </div>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default RegisterPage;
