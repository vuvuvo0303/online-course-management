import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Popconfirm, Dropdown, MenuProps, InputRef,
} from "antd";
import {
  DeleteOutlined, DownOutlined,
  EditOutlined,
  EyeOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import { Category } from "../../../models";
import { toast } from "react-toastify";
import Highlighter from "react-highlight-words";
import axiosInstance from "../../../services/axiosInstance.ts";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { ColumnType } from "antd/es/table";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { Link } from "react-router-dom";
import {paths} from "../../../consts";

type DataIndex = keyof Category;

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
  const [validateOnOpen, setValidateOnOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchCategories = useCallback(
    async (refresh = false) => {
      setLoading(true);
      try {
        let response;
        if (refresh) {
          response = await axiosInstance.post("/api/category");
        } else {
          response = await axiosInstance.post("/api/category/search", {
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
        }

        if (response.data) {
          setData(response.data.pageData || response.data);
          setPagination((prev) => ({
            ...prev,
            total: response.data.pageInfo?.totalItems || response.data.length,
            current: response.data.pageInfo?.pageNum || 1,
            pageSize: response.data.pageInfo?.pageSize || response.data.length,
          }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [pagination.current, pagination.pageSize]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleOpenModal = useCallback(() => {
    setIsModalVisible(true);
    setValidateOnOpen(true);
    fetchCategories(true);
  }, [fetchCategories]);

  const handleDelete = useCallback(
    async (_id: string, name: string) => {
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
        fetchCategories();
        toast.success(`Category ${name} deleted successfully.`);
      } catch (error) {
        console.log(error);
      }
    },
    [data, fetchCategories]
  );

  const handleEditCategory = useCallback(
    (category: Category) => {
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
                {
                  required: true,
                  message: "Please input the name of category!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Parent Category"
              name="parent_category_id"
              rules={[{ required: false }]}
            >
              <Input placeholder="Input parent category" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: false }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="_id" style={{ display: "none" }}>
              <Input type="hidden" />
            </Form.Item>
          </Form>
        ),
        okText: "Save",
        onCancel: () => form.resetFields(),
      });
    },
    [data, form]
  );

  const updateCategory = useCallback(
    async (
      values: Partial<Category> & { _id: string | null },
      originalCreatedAt: string
    ) => {
      let parentCategoryId = null;

      if (values.parent_category_id === "none") {
        parentCategoryId = null;
      } else if (values.parent_category_id) {
        const parentCategory = data.find(
          (category) => category.name === values.parent_category_id
        );
        if (parentCategory) {
          parentCategoryId = parentCategory._id;
        }
      }

      try {
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

        await axiosInstance.put(`/api/category/${values._id}`, updatedCategory);

        const updatedData = data.map((category) =>
          category._id === values._id ? updatedCategory : category
        );
        setData(updatedData);

        setIsModalVisible(false);
        form.resetFields();
        toast.success(`Category ${values.name} updated successfully.`);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [data, form]
  );

  const addNewCategory = useCallback(
    async (values: Omit<Category, "_id">) => {
      try {
        setLoading(true);

        let parentCategoryId = null;
        if (values.parent_category_id) {
          const parentCategory = data.find(
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

        const response = await axiosInstance.post(
          `/api/category`,
          categoryData
        );
        if (response.data) {
          const newCategory = response.data;
          setData((prevData) => [...prevData, newCategory]);
          setIsModalVisible(false);
          form.resetFields();
          fetchCategories();
          toast.success(`Category ${values.name} created successfully.`);
        }
      } catch (error) {
        //handle error add new category
      } finally {
        setLoading(false);
      }
    },
    [data, form, fetchCategories]
  );

  const formatDate = useCallback((dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
    } catch (error) {
      console.error("Invalid date:", dateString);
      return "Invalid date";
    }
  }, []);

  const sortColumn = useCallback(
    (columnKey: DataIndex) => {
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
        } else if (typeof aValue === "string" && typeof bValue === "string") {
          return newOrder === "ascend"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "boolean" && typeof bValue === "boolean") {
          return newOrder === "ascend"
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        } else {
          return 0;
        }
      });

      setSortOrder({ ...sortOrder, [columnKey]: newOrder });
      setData(sortedData);
    },
    [data, sortOrder]
  );
  const handleSearch = useCallback(
    (selectedKeys: string[], confirm: () => void, dataIndex: DataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    },
    []
  );
  const handleReset = useCallback((clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  }, []);

  const getColumnSearchProps = useCallback(
    (dataIndex: DataIndex): ColumnType<Category> => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: FilterDropdownProps) => (
        <div style={{ padding: 8 }}>
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
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) => {
        const recordValue = record[dataIndex];
        if (recordValue) {
          return recordValue
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase());
        }
        return false;
      },
      onFilterDropdownVisibleChange: (visible) => {
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
    }),
    [handleSearch, handleReset, searchText, searchedColumn]
  );

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

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "All",
    },
    {
      key: "2",
      label: "Admins",
    },
    {
      key: "3",
      label: "Instructors",
    },
    {
      key: "4",
      label: "Students",
    },
  ];
  if (loading === true) {
    return <p className="text-center flex justify-center">Loading ...</p>
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href={paths.ADMIN_HOME}>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Manage Categories</Breadcrumb.Item>
        </Breadcrumb>
        <Space style={{ marginTop: 32, marginBottom: 16 }}>
          <Input
            placeholder="Search..."
            style={{ width: 200 }}
          />
          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ["1"],
            }}
          >
            <Button>
              <Space>
                Filter Categories
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ["1"],
            }}
          >
            <Button>
              <Space>
                Filter Parent Categories
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Button >Clear filters</Button>
          <Button >Clear filters and sorters</Button>
        </Space>
        <Button type="primary" onClick={handleOpenModal}>
          Add New Category
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        pagination={false}
        onChange={handleTableChange}
      />
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
        onCancel={() => {
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
            <Input placeholder="Input parent category" />
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
