import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  TableColumnsType,
  TablePaginationConfig,
} from "antd";
import { Button, Image, Table } from "antd";
import { Blog, Category } from "../../../models";
import { axiosInstance, getCategories, getUserFromLocalStorrage, deleteBlog } from "../../../services";
import {
  API_GET_BLOGS,
  API_CREATE_BLOG,
  API_UPDATE_BLOG,
  paths,
  API_GET_BLOG,
} from "../../../consts";
import LoadingComponent from "../../../components/loading";
import { format } from "date-fns";
import CustomBreadcrumb from "../../../components/breadcrumb";

const AdminManageBlogs: React.FC = () => {
  const [dataBlogs, setDataBlogs] = useState<Blog[]>([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [])

  useEffect(() => {
    getBlogs();
  }, [pagination.current, pagination.pageSize]);


  const fetchCategories = async () => {
    const categories = await getCategories();
    setCategories(categories);
  };

  const getBlogs = async () => {
    setLoading(true);
    const response = await axiosInstance.post(API_GET_BLOGS, {
      searchCondition: {
        category_id: "",
        is_deleted: false,
      },
      pageInfo: {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
    setDataBlogs(response.data.pageData);

    setPagination({
      ...pagination,
      total: response.data.pageInfo.totalItems,
      current: response.data.pageInfo.pageNum,
      pageSize: response.data.pageInfo.pageSize,
    });
    setLoading(false);
  };

  const handleUpdateClick = async (id: string) => {
    setIsUpdateMode(true);
    setIsModalVisible(true);
    setLoading(true);
    const response = await axiosInstance.get(`${API_GET_BLOG}/${id}`);
    const blogData = response.data;
    setCurrentBlog(blogData);
    form.setFieldsValue({
      name: blogData.name,
      category_id: blogData.category_id,
      image_url: blogData.image_url,
      description: blogData.description,
      content: blogData.content,
    });
    setLoading(false);
  };

  const handleSubmit = async (values: Blog) => {
    if (isUpdateMode && currentBlog) {
      const user = getUserFromLocalStorrage();
      const payload = { ...values, user_id: user._id }
      await axiosInstance.put(`${API_UPDATE_BLOG}/${currentBlog._id}`, payload);
      message.success("Blog updated successfully");
    } else {
      await axiosInstance.post(API_CREATE_BLOG, values);
      message.success("Blog added successfully");
    }
    setIsModalVisible(false);
    form.resetFields();
    setIsUpdateMode(false);
    setCurrentBlog(null);
    await getBlogs();
  };

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
            onClick={() => handleUpdateClick(record._id)}
          />
          <Popconfirm
            title="Delete the Blog"
            description="Are you sure to delete this Blog?"
            onConfirm={() => deleteBlog(record._id, record.name, getBlogs)}
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
    return (<>
      <LoadingComponent />
    </>)
  }

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || 10,
    }));
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };
  return (
    <div>
      <div className="flex justify-between">
        <CustomBreadcrumb currentTitle="Manage Blogs" currentHref={paths.ADMIN_HOME} />
        <div className="py-2">
          <Button
            type="primary"
            onClick={() => {
              setIsUpdateMode(false);
              setIsModalVisible(true);
              form.resetFields();
            }}
          >
            Add New Blog
          </Button>
        </div>

        <Modal
          title={isUpdateMode ? "Update Blog" : "Add New Blog"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setIsUpdateMode(false);
            setCurrentBlog(null);
            form.resetFields();
          }}
          footer={null}
        >
          {isUpdateMode && currentBlog ? (
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="name"
                label="Title"
                rules={[{ required: true, message: "Please input the blog title!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="category_id"
                label="Category"
                rules={[{ required: true, message: "Please select a category!" }]}
              >
                <Select placeholder="Select a category">
                  {categories.map((category) => (
                    <Select.Option key={category._id} value={category._id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="image_url"
                label="Image URL"
                rules={[{ required: true, message: "Please input the image URL!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: "Please input the description!" }]}
              >
                <Input.TextArea maxLength={250} />
              </Form.Item>
              <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true, message: "Please input the content!" }]}
              >
                <Input.TextArea maxLength={250} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="name"
                label="Title"
                rules={[{ required: true, message: "Please input the blog title!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="category_id"
                label="Category"
                rules={[{ required: true, message: "Please select a category!" }]}
              >
                <Select placeholder="Select a category">
                  {categories.map((category) => (
                    <Select.Option key={category._id} value={category._id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="image_url"
                label="Image URL"
                rules={[{ required: true, message: "Please input the image URL!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: "Please input the description!" }]}
              >
                <Input.TextArea maxLength={250} />
              </Form.Item>
              <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true, message: "Please input the content!" }]}
              >
                <Input.TextArea maxLength={250} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
      <Table
        columns={columns}
        dataSource={dataBlogs}
        rowKey={(record: Blog) => record._id}
        onChange={handleTableChange}
        pagination={false}
      />
      <div className="flex justify-end py-8">
        <Pagination
          total={pagination.total}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          current={pagination.current}
          pageSize={pagination.pageSize}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>
    </div>
  );
};

export default AdminManageBlogs;
