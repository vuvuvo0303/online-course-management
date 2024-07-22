import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Form, message, Modal, Popconfirm, TableColumnsType } from "antd";
import { Breadcrumb, Button, Image, Table } from "antd";
import { Blog } from "../../../models";
import axiosInstance from "../../../services/axiosInstance.ts";
import { API_DELETE_BLOG, API_GET_BLOGS, paths } from "../../../consts/index.ts";
import { format } from "date-fns";


const AdminManageBlogs: React.FC = () => {
  const [dataBlogs, setDataBlogs] = useState<Blog[]>([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleDelete = async (id: string, title: string) => {
    try {
      await axiosInstance.delete(`${API_DELETE_BLOG}/${id}`);
      message.success(`Delete blog ${title} successfully`);
      await getBlogs();
    } catch (error) {
      //
    }
  };

  const getBlogs = async () => {
    const response = await axiosInstance.post(API_GET_BLOGS,
      {
        "searchCondition": {
          "category_id": "",
          "is_deleted": false
        },
        "pageInfo": {
          "pageNum": 1,
          "pageSize": 100
        }
      });
    setDataBlogs(response.data.pageData);
  };
  useEffect(() => {

    getBlogs();
    setLoading(false)
  }, []);


  const columns: TableColumnsType<Blog> = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
      width: "15%",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      width: "15%",
      render: (image_url: string) => <Image width={100} height={100} src={image_url} />,
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy"),
      width: "10%",
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => format(new Date(updated_at), "dd/MM/yyyy"),
      width: "10%",
    },
    {
      title: "Action",
      width: "10%",
      key: "action",
      render: (record: Blog) => (
        <div>
          <EditOutlined
            className="hover:cursor-pointer text-blue-400 hover:opacity-60"
            style={{ fontSize: "20px" }}
          />
          <Popconfirm
            title="Delete the User"
            description="Are you sure to delete this Blog?"
            onConfirm={() => handleDelete(record._id, record.title)}
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

  if (loading) {
    return <p className="text-center">Loading...</p>
  }

  return (
    <div>
      <div className="flex justify-between">
        <Breadcrumb
          className="py-2"
          items={[
            {
              title: <HomeOutlined />,
            },
            {
              href: paths.ADMIN_HOME,
              title: (
                <>
                  <UserOutlined />
                  <span>Admin</span>
                </>
              ),
            },
            {
              title: "Manage Blogs",
            },
          ]}
        />
        <div className="py-2">
          <Button type="primary"
            onClick={() => {
              setIsModalVisible(true);
              form.resetFields();
            }}
          >Add New Blog</Button>
        </div>

        <Modal title="Add New Blog" open={isModalVisible} onCancel={() => setIsModalVisible(false)}>
          <Form form={form} layout="vertical">

          </Form>
        </Modal>
      </div>
      <Table columns={columns} dataSource={dataBlogs} rowKey={(record: Blog) => record._id} />;
    </div>
  );
};

export default AdminManageBlogs;
