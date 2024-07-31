import { Avatar, Button, Col, Form, Input, message, Row, Upload } from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { format } from "date-fns";
import axiosInstance from "../../../services/axiosInstance";
import { API_UPDATE_USER } from "../../../consts/index";
import LoadingComponent from "../../../components/loading";
import uploadFile from "../../../utils/upload";


type FileType = Parameters<Required<UploadProps>["beforeUpload"]>[0];





const EditProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    phone_number: "",
    dob: "",
    avatar: "",
    balance: 0,
    balance_total: 0,
    bank_account: "",
    bank_name: "",
    created_at: "",
    description: "",
    google_id: "",
    is_deleted: false,
    is_verified: false,
    role: "",
    status: false,
    token_version: 0,
    transactions: [],
    updated_at: "",
    video: "",
  });
  

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData);
      const dateOfBirth = format(new Date(parsedData.dob), "dd/MM/yyyy");
      setUser({
        _id: parsedData._id,
        name: parsedData.name,
        email: parsedData.email,
        phone_number: parsedData.phone_number,
        dob: dateOfBirth,
        avatar: parsedData.avatar,
        balance: parsedData.balance,
        balance_total: parsedData.balance_total,
        bank_account: parsedData.bank_account,
        bank_name: parsedData.bank_name,
        created_at: parsedData.created_at,
        description: parsedData.description,
        google_id: parsedData.google_id,
        is_deleted: parsedData.is_deleted,
        is_verified: parsedData.is_verified,
        role: parsedData.role,
        status: parsedData.status,
        token_version: parsedData.token_version,
        transactions: parsedData.transactions,
        updated_at: parsedData.updated_at,
        video: parsedData.video,
      });
      form.setFieldsValue({
        name: parsedData.name,
        email: parsedData.email,
        phone: parsedData.phone_number,
        dob: dateOfBirth,
        avatar: parsedData.avatar,
      });
      if (parsedData.avatar) {
        setFileList([
          {
            url: parsedData.avatar,
            uid: "",
            name: "",
          },
        ]);
      }
    }
  }, [form]);


  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

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

  const handleEdit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
  
      let avatarUrl: string = user.avatar || "";
      if (fileList.length > 0) {
        const file = fileList[0];
        if (file.originFileObj) {
          avatarUrl = await uploadFile(file.originFileObj as File);
        }
      }
    
      const formattedDob = format(new Date(values.dob), "yyyy-MM-dd");
  
    
      const updatedUser = {
        ...user, 
        name: values.name !== undefined ? values.name : user.name,
        email: values.email !== undefined ? values.email : user.email,
        phone_number: values.phone_number !== undefined ? values.phone_number : user.phone_number,
        dob: formattedDob !== undefined ? formattedDob : user.dob,
        avatar: avatarUrl !== undefined ? avatarUrl : user.avatar,
        description: values.description !== undefined ? values.description : user.description,
        video: values.video !== undefined ? values.video : user.video,
        balance: user.balance, 
        balance_total: user.balance_total, 
        bank_account: user.bank_account, 
        bank_name: user.bank_name, 
        created_at: user.created_at, 
        google_id: user.google_id, 
        is_deleted: user.is_deleted, 
        is_verified: user.is_verified, 
        role: user.role, 
        status: user.status, 
        token_version: user.token_version, 
        transactions: user.transactions, 
        updated_at: new Date().toISOString(), 
      };
  
      console.log("Updated user data:", updatedUser);
  
      const response = await axiosInstance.put(`${API_UPDATE_USER}/${user._id}`, updatedUser);
  
      if (response.data.email === updatedUser.email) {
        // Cập nhật localStorage với dữ liệu mới
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
  
        form.setFieldsValue({
          name: updatedUser.name,
          email: updatedUser.email,
          phone_number: updatedUser.phone_number,
          dob: format(new Date(updatedUser.dob), "dd/MM/yyyy"),
          avatar: updatedUser.avatar,
        });
  
        message.success(`Cập nhật tài khoản ${values.name} thành công`);
      } else {
        message.error(`Cập nhật tài khoản ${values.name} thất bại. Vui lòng thử lại.`);
      }
    } catch (error) {
      console.error("Update error:", error);
      message.error("Cập nhật người dùng thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  if (loading) {
    return <LoadingComponent />;
  }

  const getAvatarUrl = (url: string) => `${url}?t=${new Date().getTime()}`;

  return (
    <div className="w-full rounded-md">
      <div className="bg-gradient-to-r from-blue-200 to-amber-100 h-20"></div>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex gap-4">
          <Avatar size={90} src={getAvatarUrl(user.avatar) || "https://default-avatar-url.com"} alt="avatar" />
          <div className="flex flex-col justify-center gap-2">
            <span className="text-sx font-bold">{user.name}</span>
            <span className="text-xs">{user.email}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Form form={form} onFinish={handleEdit}>
          <Row gutter={16}>
            <Col span={12} className="flex justify-center">
              <Form.Item
                label="Full Name"
                name="name"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="w-2/3"
              >
                <Input className="w-full h-10" />
              </Form.Item>
            </Col>
            <Col span={12} className="flex justify-center">
              <Form.Item label="Email" name="email" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} className="w-2/3">
                <Input className="w-full h-10" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12} className="flex justify-center">
              <Form.Item label="Phone" name="phone" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} className="w-2/3">
                <Input className="w-full h-10" type="number" />
              </Form.Item>
            </Col>
            <Col span={12} className="flex justify-center">
              <Form.Item
                label="Date of Birth"
                name="dob"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="w-2/3"
              >
                <Input className="w-full h-10" />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex pl-28 ml-2">
            <Form.Item label="Avatar" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </div>
          <div className="flex pl-28 ml-2 ">
            <Button loading={loading} type="primary" htmlType="submit">
              Edit
            </Button>
          </div>
        </Form>
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

export default EditProfile;

