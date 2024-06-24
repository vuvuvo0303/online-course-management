import { useEffect, useState } from "react";
import axios from "axios";
import type { FormProps, PopconfirmProps } from "antd";
import { Breadcrumb, Form, Button, Image, Input, Modal, Switch, Table, Upload, Popconfirm, message } from "antd";
import { DeleteOutlined, EditOutlined, HomeOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { format, formatISO } from "date-fns";
import { Student } from "../../../models";
import { toast } from "react-toastify";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useForm } from "antd/es/form/Form";
import uploadFile from "../../../utils/upload";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type FieldType = {
  fullName: string;
  avatarUrl: string;
  email: string;
  role: string;
  createdAt: string;
  password:string;
};
const AdminManageStudents: React.FC = () => {
  const [data, setData] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form] = useForm();
  // const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  //   console.log("Success:", values);
  // };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleDelete = async (userId: string, email: string) => {
    try {
      await axios.delete(`https://665fbf245425580055b0b23d.mockapi.io/students/${userId}`);
      const updatedData = data.filter((student) => student.userId !== userId);
      setData(updatedData);
      toast.success(`Delete user ${email} successfully`);
    } catch (error) {
      toast.error(`Delete user ${email} failed`);
    }
  };
  const handleSubmit = async (values ) => {
    try {
      console.log(values);
      console.log(values.avatarUrl.file.originFileObj);

      const url = await uploadFile(values.avatarUrl.file.originFileObj);
      console.log(url);
      values.avatarUrl = url;

      const now = new Date();
      values.createdAt = formatISO(now);

      const response = await axios.post("https://665fbf245425580055b0b23d.mockapi.io/students", values);
      console.log(response.data);

      setData([...data, response.data]);

      form.resetFields();

      toast.success("Student added successfully");

    
      // fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Failed to add student");
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://665fbf245425580055b0b23d.mockapi.io/students");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);
  // const confirm: PopconfirmProps["onConfirm"] = (e) => {
  //   console.log(e);
  //   message.success("Click on Yes");
  // };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string) => <a>{text}</a>,
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      render: (createdDate: string) => formatDate(createdDate),
      width: "15%",
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      render: (updatedDate: string) => formatDate(updatedDate),
      width: "15%",
    },
    {
      title: "Image",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      render: (avatarUrl: string) => <Image src={avatarUrl} width={50} />,
    },
    {
      title: "Status",
      key: "isActive",
      dataIndex: "isActive",
      width: "10%",
      render: (isActive: boolean) => (
        <Switch defaultChecked={isActive} onChange={(checked) => console.log(`switch to ${checked}`)} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: Student) => (
        <div>
          <EditOutlined className="hover:cursor-pointer text-blue-400 hover:opacity-60" style={{ fontSize: "20px" }} />
          <Popconfirm
            title="Delete the Student"
            description="Are you sure to delete this Student?"
            onConfirm={() => handleDelete(record.userId, record.email)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              className="ml-5 text-red-500 hover:cursor-pointer hover:opacity-60"
              style={{ fontSize: "20px" }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

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
    <div>
      <div className="flex justify-between">
        <Breadcrumb
          className="py-2"
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: "/dashboard/admin",
              title: (
                <>
                  <UserOutlined />
                  <span>Admin</span>
                </>
              ),
            },
            {
              title: "Manage Students",
            },
          ]}
        />
        <div className="py-2">
          <Button onClick={showModal} type="primary">
            Add New Students
          </Button>
          <Modal title="Add New Student" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
              form={form}
              onFinish={handleSubmit}
              name="basic"
              labelCol={{ span: 24 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your Email!" }]}
              >
                <Input className="py-2" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Username"
                name="fullName"
                rules={[{ required: true, message: "Please input your username!" }]}
              >
                <Input className="py-2" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Password "
                name="password"
                rules={[{ required: true, message: "Please input your Password!" }]}
              >
                <Input.Password className="py-2" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Image"
                name="avatarUrl"
                rules={[{ required: true, message: "Please input your Image!" }]}
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
              <Form.Item<FieldType> name="role" initialValue="Student" style={{ display: "none" }}>
                <Input type="hidden" />
              </Form.Item>
            </Form>
          </Modal>
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
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default AdminManageStudents;
