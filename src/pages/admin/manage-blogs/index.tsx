import { useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, HomeOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Breadcrumb, Button, Image, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import axios from "axios";
import { Blog } from "../../../models";
import { toast } from "react-toastify";

type DataIndex = keyof Blog;

const AdminManageBlogs: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [data, setData] = useState<Blog[]>([]);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend">("ascend");
  const [loading, setLoading] = useState<boolean>(true);

  const handleDelete = async (id: string, title: string) => {
    try {
      await axios.delete(`https://665fbf245425580055b0b23d.mockapi.io/blogs/${id}`);
      const updatedData = data.filter(blog => blog.id !== id);
      setData(updatedData);
      toast.success(`Delete blog ${title} successfully`);
    } catch (error) {
      toast.error(`Delete blog ${title} failed`);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(
        "https://665fbf245425580055b0b23d.mockapi.io/blogs"
      );
      console.log(response);
      setData(response.data);
    };
    fetchBlogs();
    setLoading(false)
  }, []);

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

  const sortColumn = () => {
    const newOrder = sortOrder === "ascend" ? "descend" : "ascend";
    const sortedData = [...data].sort((a, b) => {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();
      return newOrder === "ascend" ? timeA - timeB : timeB - timeA;
    });
    setData(sortedData);
    setSortOrder(newOrder);
  };

  
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<Blog> => ({
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
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
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

  const columns: TableColumnsType<Blog> = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "15%",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: "15%",
      sorter: true,
      sortOrder: sortOrder,
      sortDirections: ["descend", "ascend"],
      onHeaderCell: () => ({
        onClick: () => sortColumn(),
      }),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <span>
          {description.title}: {description.content}
        </span>
      ),
    },
    {
      width: "20%",
      title: "View",
      dataIndex: "view",
      key: "view",
    },
    {
      title: "Blog Image",
      dataIndex: "blog_image",
      key: "blog_image",
      render: (blog_image: string) => <Image src={blog_image} />,
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
          <DeleteOutlined
            onClick={() => handleDelete(record.id, record.title)}
            className="ml-5 text-red-500 hover:cursor-pointer hover:opacity-60"
            style={{ fontSize: "20px" }}
          />
        </div>
      ),
    },
  ];

  if(loading){
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
              href: "/dashboard/admin",
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
      <Table columns={columns} dataSource={data} />;
    </div>
  );
};

export default AdminManageBlogs;
