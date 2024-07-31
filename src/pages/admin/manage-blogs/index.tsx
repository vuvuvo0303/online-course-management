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
  Upload,
} from "antd";
import { Button, Image, Table } from "antd";
import { Blog, Category } from "../../../models";
import { axiosInstance, getCategories, getUserFromLocalStorage, deleteBlog } from "../../../services";
import { API_GET_BLOGS, API_CREATE_BLOG, API_UPDATE_BLOG, API_GET_BLOG } from "../../../consts";
import LoadingComponent from "../../../components/loading";
import { format } from "date-fns";
import CustomBreadcrumb from "../../../components/breadcrumb";
import TinyMCEEditorComponent from "../../../components/tinyMCE";

import { PlusOutlined } from "@ant-design/icons";

import type { GetProp, UploadFile, UploadProps } from "antd";
import uploadFile from "../../../utils/upload";

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
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    getBlogs();
  }, [pagination.current, pagination.pageSize]);

  const fetchCategories = async () => {
    const responseCategories = await getCategories();
    const categories = responseCategories.data.pageData;
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
            image_url: blogData.image_url, // Hiển thị URL trong form
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
    } catch (error) {
        console.error("Error fetching blog data:", error);
    } finally {
        setLoading(false);
    }
};

  const handleSubmit = async (values: Blog) => {
    try {
      
        let avatarUrl: string = "";
        if (fileList.length > 0) {
            const file = fileList[0];
            if (file.originFileObj) {
                avatarUrl = await uploadFile(file.originFileObj as File);
            }
        }

    
        const user = getUserFromLocalStorage();
        const payload = { ...values, content, user_id: user._id, image_url: avatarUrl };

        if (isUpdateMode && currentBlog) {
            await axiosInstance.put(`${API_UPDATE_BLOG}/${currentBlog._id}`, payload);
            message.success("Blog updated successfully");
        } else {
            await axiosInstance.post(API_CREATE_BLOG, payload);
            message.success("Blog added successfully");
        }

        // Xử lý sau khi submit thành công
        setIsModalVisible(false);
        form.resetFields();
        setIsUpdateMode(false);
        setFileList([]);
        setCurrentBlog(null);
        setContent("");
        await getBlogs();
    } catch (error) {
        console.error("Error:", error);
        message.error("An error occurred while saving the blog.");
    }
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

      <Modal
        title={isUpdateMode ? "Update Blog" : "Add New Blog"}
        open={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Title" rules={[{ required: true, message: "Please input the blog title!" }]}>
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
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input the blog description!" }]}
          >
            <Input.TextArea maxLength={250} showCount />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please input the blog content!" }]}
          >
            <TinyMCEEditorComponent value={content} onEditorChange={handleEditorChange} />
          </Form.Item>
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
