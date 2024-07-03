import React, { useState, useEffect, useRef } from "react";
import {
  Breadcrumb,
  Button,
  Input,
  Space,
  Table,
  Modal,
  Form,
  Spin,
  Pagination,
  Popconfirm,
  Select,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import { Category } from "../../../models";
import { toast } from "react-toastify";
import Highlighter from "react-highlight-words";
import axiosInstance from "../../../services/api.ts";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { ColumnType } from "antd/es/table";
import type { InputRef } from "antd/lib/input/Input";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { Link } from "react-router-dom";

interface AxiosResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string[];
}

type DataIndex = keyof Category;

const { Option } = Select;

const AdminManageCategories: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [sortOrder, setSortOrder] = useState<{
    [key in DataIndex]?: "ascend" | "descend";
  }>({
    created_at: "ascend",
    updated_at: "ascend",
  });
  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<DataIndex | "">("");
  const searchInput = useRef<InputRef>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, [pagination.current, pagination.pageSize]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<{
        pageData: Category[];
        pageInfo: { totalItems: number; pageNum: number; pageSize: number };
      }> = await axiosInstance.post("/api/category/search", {
        searchCondition: {
          role: "all",
          status: true,
          is_deleted: false,
        },
        pageInfo: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
      });

      if (response.data && response.data.pageData) {
        setData(response.data.pageData);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pageInfo.totalItems,
          current: response.data.pageInfo.pageNum,
          pageSize: response.data.pageInfo.pageSize,
        }));
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = async (_id: string, name: string) => {
    const isParentCategory = data.some(
      (category) => category.parent_category_id === _id
    );

    if (isParentCategory) {
      toast.error(
        `Cannot delete category ${name} as it is a parent category of another category.`
      );
      return;
    }

    try {
      await axiosInstance.delete(`/api/category/${_id}`);
      setData((prevData) =>
        prevData.filter((category) => category._id !== _id)
      );
      toast.success(`Deleted category ${name} successfully`);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCategory = (category: Category) => {
    form.setFieldsValue({
      _id: category._id,
      name: category.name,
      parent_category_id: category.parent_category_id,
      description: category.description,
      created_at: category.created_at,
    });

    Modal.confirm({
      title: `Edit Category - ${category.name}`,
      content: (
        <Form
          form={form}
          onFinish={(values) => updateCategory(values, category.created_at)}
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

          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input the name of category!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Parent Category"
            name="parent_category_id"
            rules={[{ required: false }]}
          >
            <Select>
              <Option key="none" value={null}>
                None
              </Option>
              {data
                .filter((item) => item._id !== category._id)
                .map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: false }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      ),
      okText: "Save",
      onOk: () => form.submit(),
      onCancel: () => form.resetFields(),
    });
  };

  const updateCategory = async (
    values: Partial<Category> & { _id: string | null },
    originalCreatedAt: string
  ) => {
    if (values.parent_category_id === "none") {
      values.parent_category_id = null;
    }

    if (!values._id) {
      toast.error("Invalid category ID");
      return;
    }

    try {
      setLoading(true);

      const updatedCategory: Category = {
        _id: values._id,
        name: values.name ?? "",
        description: values.description ?? "",
        parent_category_id: values.parent_category_id ?? null,
        user_id: values.user_id ?? "",
        is_deleted: values.is_deleted ?? false,
        created_at: originalCreatedAt,
        updated_at: new Date().toISOString(),
        __v: values.__v ?? 0,
      };

      await axiosInstance.put(`/api/category/${values._id}`, updatedCategory);

      const updatedData = data.map((category) =>
        category._id === values._id ? updatedCategory : category
      );
      setData(updatedData);

      toast.success(`Updated category ${values.name} successfully`);

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addNewCategory = async (values: Omit<Category, "_id">) => {
    try {
      setLoading(true);
      const response: AxiosResponse<Category> = await axiosInstance.post(
        `/api/category`,
        values
      );
      const newCategory = response.data;
      setData((prevData) => [...prevData, newCategory]);
      toast.success("Created new category successfully");
      setData([]);
      setIsModalVisible(false);
      form.resetFields();
      setLoading(false);
      fetchCategories();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to create new category. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
    } catch (error) {
      console.error("Invalid date:", dateString);
      return "Invalid date";
    }
  };

  const sortColumn = (columnKey: DataIndex) => {
    const newOrder = sortOrder[columnKey] === "ascend" ? "descend" : "ascend";

    const sortedData = [...data].sort((a: Category, b: Category) => {
      let aValue: string | number | boolean | Date | null = a[columnKey];
      let bValue: string | number | boolean | Date | null = b[columnKey];

      if (columnKey === "created_at" || columnKey === "updated_at") {
        if (typeof aValue === "string" || typeof aValue === "number") {
          aValue = new Date(aValue).getTime();
        }
        if (typeof bValue === "string" || typeof bValue === "number") {
          bValue = new Date(bValue).getTime();
        }
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return newOrder === "ascend" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return newOrder === "ascend"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    setData(sortedData);
    setSortOrder((prev) => ({ ...prev, [columnKey]: newOrder }));
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<Category> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()) || false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnType<Category>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      onHeaderCell: () => ({
        onClick: () => sortColumn("name"),
      }),
    },
    {
      title: "Parent Category",
      dataIndex: "parent_category_id",
      key: "parent_category_id",
      render: (parent_category_id: string) => {
        const category = data.find(
          (category) => category._id === parent_category_id
        );
        return category ? category.name : "None";
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => formatDate(created_at.toString()),
      sortDirections: ["descend", "ascend"],
      onHeaderCell: () => ({
        onClick: () => sortColumn("created_at"),
      }),
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => formatDate(updated_at.toString()),
      sortDirections: ["descend", "ascend"],
      onHeaderCell: () => ({
        onClick: () => sortColumn("updated_at"),
      }),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Category) => (
        <div>
          <Link to={`/admin/manage-categories/${record._id}`}>
            <EyeOutlined className="text-purple-500 mr-2" />
          </Link>
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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Manage Categories</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add New Category
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          pagination={false}
          onChange={handleTableChange}
        />
      </Spin>
      <div className="flex justify-end py-8">
        <Pagination
          total={pagination.total}
          showTotal={(total) => `Total ${total} items`}
          current={pagination.current}
          pageSize={pagination.pageSize}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>
      <Modal
        title="Add New Category"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={addNewCategory} labelCol={{ span: 24 }}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Parent Category"
            name="parent_category_id"
            rules={[{ required: false }]}
          >
            <Select>
              <Option key="none" value={null}>
                None
              </Option>
              {data.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: false }]}
          >
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
