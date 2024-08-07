import { useState, useEffect, useCallback } from "react";
import { Button, Input, Space, Table, Modal, Form, Pagination, Popconfirm, Select, message, } from "antd";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Category } from "../../../models";
import { axiosInstance, getCategories } from "../../../services";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { ColumnType } from "antd/es/table";
import { API_CREATE_CATEGORY, API_DELETE_CATEGORY, API_UPDATE_CATEGORY } from "../../../consts";
import { useDebounce } from "../../../hooks";
import { CustomBreadcrumb, LoadingComponent, NameFormItem } from "../../../components";
import { formatDate } from "../../../utils";
const AdminManageCategories: React.FC = () => {
  const [dataCategories, setDataCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [validateOnOpen, setValidateOnOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [parentCategories, setParentCategories] = useState<Category[]>([]);


  const debouncedSearchTerm = useDebounce(searchText, 500);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const responseCategories = await getCategories(debouncedSearchTerm, false, pagination.current, pagination.pageSize);
      setDataCategories(responseCategories.data.pageData || responseCategories.data);
      setPagination((prev) => ({
        ...prev,
        total: responseCategories.data.pageInfo?.totalItems || responseCategories.data.length,
        current: responseCategories.data.pageInfo?.pageNum || 1,
        pageSize: responseCategories.data.pageInfo?.pageSize || prev.pageSize,
      }));
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize, searchText, debouncedSearchTerm]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, searchText]);

  const fetchParentCategories = useCallback(async () => {
    const responseParentCategories = await getCategories("", false);
    setParentCategories(responseParentCategories.data.pageData || responseParentCategories.data);
  }, []);

  useEffect(() => {
    fetchParentCategories();
  }, [fetchParentCategories]);

  const handleOpenModal = useCallback(() => {
    form.resetFields();
    setIsModalVisible(true);
    setValidateOnOpen(true);
  }, [form]);

  const handleDelete = async (_id: string, name: string) => {
    const isParentCategory = dataCategories.some(
      (category) => category.parent_category_id === _id
    );

    if (isParentCategory) {
      message.error(`Cannot delete category ${name} as it is a parent category of another category.`);
      return;
    }
    await axiosInstance.delete(`${API_DELETE_CATEGORY}/${_id}`);
    message.success(`Category ${name} deleted successfully.`);
    await fetchCategories();
  };

  const updateCategory = useCallback(
    async (values: Partial<Category> & { _id: string | null }, originalCreatedAt: string) => {
      let parentCategoryId = null;

      if (values.parent_category_id && values.parent_category_id !== "none") {
        parentCategoryId = values.parent_category_id;
      }
      setLoading(true);
      const updatedCategory: Category = {
        _id: values._id!,
        name: values.name ?? "",
        description: values.description ?? "",
        parent_category_id: parentCategoryId,
        user_id: values.user_id ?? "",
        is_deleted: values.is_deleted ?? false,
        created_at: originalCreatedAt,
        updated_at: new Date().toISOString(),
      };

      try {
        const response = await axiosInstance.put(`${API_UPDATE_CATEGORY}/${values._id}`, updatedCategory);

        if (response.data) {
          setDataCategories((prevData) =>
            prevData.map((category) =>
              category._id === values._id
                ? { ...category, ...response.data }
                : category
            )
          );
          setIsModalVisible(false);
          form.resetFields();
          message.success(`Category ${values.name} updated successfully.`);
        }
      } finally {
        setLoading(false);
      }
    },
    [dataCategories, form]
  );

  const handleEditCategory = useCallback(
    async (category: Category) => {
      form.resetFields();
      await fetchCategories();

      Modal.confirm({
        title: `Edit Category - ${category.name}`,
        content: (
          <Form
            form={form}
            onFinish={(values) => {
              updateCategory(values, category.created_at);
            }}
            initialValues={{
              _id: category._id,
              name: category.name,
              parent_category_id: category.parent_category_id,
              description: category.description,
            }}
            labelCol={{ span: 24 }}
          >
            <Form.Item name="_id" style={{ display: "none" }}>
              <Input />
            </Form.Item>

            <NameFormItem />
            <Form.Item label="Parent Category" name="parent_category_id" rules={[{ required: false }]}>
              <Select placeholder="Select parent category">
                <Select.Option key="none" value="none">
                  None
                </Select.Option>
                {parentCategories
                  .filter((parentCategory) => parentCategory._id !== form.getFieldValue("_id"))
                  .map((parentCategory) => (
                    <Select.Option key={parentCategory._id} value={parentCategory._id}>
                      {parentCategory.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[{ required: false }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        ),
        okText: "Save",
        onOk: () => {
          form.submit();
        },
        onCancel: () => {
          form.resetFields();
        },
      });
    },
    [form, updateCategory, fetchCategories, dataCategories]
  );

  const addNewCategory = useCallback(
    async (values: Omit<Category, "_id">) => {
      setLoading(true);

      let parentCategoryId = null;
      if (values.parent_category_id) {
        const parentCategory = dataCategories.find(
          (category) => category.name === values.parent_category_id
        );
        if (parentCategory) {
          parentCategoryId = parentCategory._id;
        }
      }

      const categoryData = {
        ...values,
        parent_category_id: parentCategoryId,
      };

      try {
        const response = await axiosInstance.post(API_CREATE_CATEGORY, categoryData);
        if (response.data) {
          const newCategory = response.data;
          setDataCategories((prevData) => [...prevData, newCategory]);
          form.resetFields();
          fetchCategories();
          message.success(`Category ${values.name} created successfully.`);
          setIsModalVisible(false);
        }
      } finally {
        setLoading(false);
      }
    },
    [dataCategories, form, fetchCategories]
  );

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || 10,
    }));
  };
  const handleSearch = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  }, [fetchCategories]);

  if (loading) {
    return (<>
      <LoadingComponent />
    </>)
  }

  const columns: ColumnType<Category>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Parent Category",
      dataIndex: "parent_category_id",
      key: "parent_category_id",
      render: (parent_category_id: string) => {
        const category = dataCategories.find(
          (category) => category._id === parent_category_id
        );
        return category ? category.name : "None";
      },
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => formatDate(created_at),
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => formatDate(updated_at),
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_: unknown, record: Category) => (
        <div>
          <EditOutlined
            className="text-blue-500"
            style={{ fontSize: "16px", marginLeft: "8px", cursor: "pointer" }}
            onClick={() => handleEditCategory(record)}
          />
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record._id, record.name)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              className="text-red-500"
              style={{ fontSize: "16px", marginLeft: "8px", cursor: "pointer" }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const handleSearchText= (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <div>
      <div className="flex justify-between items-center ">
        <CustomBreadcrumb />

        <Button type="primary" onClick={handleOpenModal}>
          Add New Category
        </Button>
      </div>
      <Space>
        <Input.Search
          placeholder="Search By Name"
          value={searchText}
          onChange={handleSearchText}
          onSearch={handleSearch}
          style={{ width: 200 }}
          enterButton={<SearchOutlined className="text-white" />}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={dataCategories}
        rowKey="_id"
        pagination={false}
        onChange={handleTableChange}
        className="overflow-auto"
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
        title="Add New Category"
        open={isModalVisible}
        onCancel={() => {
          form.resetFields();
          setIsModalVisible(false);
          setValidateOnOpen(false);
        }}
        footer={null}
      >
        <Form
          form={form}
          onFinish={addNewCategory}
          labelCol={{ span: 24 }}
          validateTrigger={validateOnOpen ? "onSubmit" : "onChange"}
        >
          <NameFormItem />
          <Form.Item label="Parent Category" name="parent_category_id" rules={[{ required: false }]}>
            <Select placeholder="Select parent category">
              {parentCategories.map((category) => (
                <Select.Option key={category._id} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: false }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManageCategories;
