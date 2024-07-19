import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { message, Popconfirm, TableColumnsType } from "antd";
import { Breadcrumb, Button, Image, Table } from "antd";
import { Blog } from "../../../models";
import axiosInstance from "../../../services/axiosInstance.ts";
import { API_DELETE_BLOG, API_GET_BLOGS, paths } from "../../../consts/index.ts";
import { format } from "date-fns";


const AdminManageBlogs: React.FC = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleDelete = async (id: string, title: string) => {
    try {
      await axiosInstance.delete(`${API_DELETE_BLOG}/${id}`);
      message.success(`Delete blog ${title} successfully`);
      await fetchBlogs();
    } catch (error) {
      //
    }
  };

  const fetchBlogs = async () => {
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
    setData(response.data.pageData);
  };
  useEffect(() => {

    fetchBlogs();
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
      title: "Blog Image",
      dataIndex: "image_url",
      key: "image_url",
      width: "15%",
      render: (image_url: string) => <Image width={100} height={100} src={image_url} />,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy"),
      width: "10%",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => format(new Date(updated_at), "dd/MM/yyyy"),
      width: "10%",
    },
    {
      title: "Action",
      width: "15%",
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
          <Button type="primary">Add New Blogs</Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} rowKey={(record: Blog) => record._id} />;
    </div>
  );
};

export default AdminManageBlogs;
