import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Form,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  TableColumnsType,
  TablePaginationConfig,
  Upload,
} from "antd";
import { Button, Image, Table } from "antd";
import { Blog, Category } from "../../../models";
import { axiosInstance, getCategories, getUserFromLocalStorage, deleteBlog, getBlogs } from "../../../services";
import { API_CREATE_BLOG, API_UPDATE_BLOG, API_GET_BLOG } from "../../../consts";
import { ContentFormItem, CustomBreadcrumb, DescriptionFormItem, LoadingComponent, UploadButton, TitleFormItem } from "../../../components";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { formatDate, getBase64, uploadFile } from "../../../utils";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const AdminManageBlogs: React.FC = () => {
  const [dataBlogs, setDataBlogs] = useState<Blog[]>([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [content, setContent] = useState<string>("");
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

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [pagination.current, pagination.pageSize]);

  const fetchCategories = async () => {
    const responseCategories = await getCategories();
    const categories = responseCategories.data.pageData;
    setCategories(categories);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const responseBlog = await getBlogs("", false, pagination.current, pagination.pageSize);
      setDataBlogs(responseBlog.data.pageData);
      setPagination({
        ...pagination,
        total: responseBlog.data.pageInfo.totalItems,
        current: responseBlog.data.pageInfo.pageNum,
        pageSize: responseBlog.data.pageInfo.pageSize,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = (value: string) => {
    setContent(value);
    form.setFieldsValue({ content: value });
  };

  const handleUpdateClick = async (id: string) => {
    setIsUpdateMode(true);
    setIsModalVisible(true);
    setLoading(true);

    try {
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
      setContent(blogData.content);

      // Đặt fileList nếu có ảnh
      if (blogData.image_url) {
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: blogData.image_url,
          },
        ]);
      } else {
        setFileList([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: Blog) => {
    let avatarUrl: string = "";
    if (fileList.length > 0) {
      const file = fileList[0];
      if (file.originFileObj) {
        avatarUrl = await uploadFile(file.originFileObj as File);
      } else if (file.url) {
        avatarUrl = file.url;
      }
    }
    const user = getUserFromLocalStorage();
    const payload = { ...values, content, user_id: user._id, image_url: avatarUrl };
    setLoading(true);
    try {
      if (isUpdateMode && currentBlog) {
        await axiosInstance.put(`${API_UPDATE_BLOG}/${currentBlog._id}`, payload);
        message.success("Blog updated successfully");
      } else {
        await axiosInstance.post(API_CREATE_BLOG, payload);
        message.success("Blog added successfully");
      }
    } finally {
      setLoading(false);
    }

    // Xử lý sau khi submit thành công
    setIsModalVisible(false);
    form.resetFields();
    setIsUpdateMode(false);
    setFileList([]);
    setCurrentBlog(null);
    setContent("");
    await fetchBlogs();

  };


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

  const handleResetContent = () => {
    setIsUpdateMode(false);
    setIsModalVisible(true);
    setContent("");
    form.resetFields();
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
    setIsUpdateMode(false);
    setCurrentBlog(null);
    form.resetFields();
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
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      render: (created_at: Date) => formatDate(created_at),
      width: "10%",
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => formatDate(updated_at),
      width: "10%",
    },
    {
      title: "Action",
      width: "10%",
      key: "action",
      render: (_: unknown, record: Blog) => (
        <div>
          <EditOutlined
            className="hover:cursor-pointer text-blue-400 hover:opacity-60"
            style={{ fontSize: "20px" }}
            onClick={() => handleUpdateClick(record._id)}
          />
          <Popconfirm
            title="Delete the Blog"
            description="Are you sure to delete this Blog?"
            onConfirm={() => deleteBlog(record._id, record.name, fetchBlogs)}
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
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <CustomBreadcrumb />
        <div className="py-2">
          <Button type="primary" onClick={handleResetContent}>
            Add New Blog
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={dataBlogs}
        rowKey="_id"
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

      <Modal
        title={isUpdateMode ? "Update Blog" : "Add New Blog"}
        open={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <TitleFormItem />
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
            label="Image"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : <UploadButton />}
            </Upload>
          </Form.Item>
          <DescriptionFormItem />
          <ContentFormItem value={content} onEditorChange={handleEditorChange} />
          <Form.Item>
            <div className="flex justify-end">
              <Button onClick={handleCancelModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="ml-2">
                {isUpdateMode ? "Update Blog" : "Add Blog"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default AdminManageBlogs;
