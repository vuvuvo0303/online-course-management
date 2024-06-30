import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Breadcrumb, Button, Image, Input, Space, Switch, Table } from "antd";
import { DeleteOutlined, EditOutlined, HomeOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { Instructor } from "../../../models";
import { toast } from "react-toastify";
import Highlighter from "react-highlight-words";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";

type DataIndex = keyof Instructor;

const AdminManageInstructors: React.FC = () => {
  const [data, setData] = useState<Instructor[]>([]);
  const [sortOrder, setSortOrder] = useState<{ [key: string]: "ascend" | "descend" }>({
    createdDate: "ascend",
    updatedDate: "ascend",
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleDelete = async (_id: string, email: string) => {
    try {
      await axios.delete(`https://665fbf245425580055b0b23d.mockapi.io/instructors/${_id}`);
      const listAfterDelete = data.filter((instructor) => instructor._id !== _id);
      setData(listAfterDelete);
      toast.success(`Deleted user ${email} successfully`);
    } catch (error) {
      toast.error(`Failed to delete user ${email}`);
    }
  };

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get("https://665fbf245425580055b0b23d.mockapi.io/instructors");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  const sortColumn = (columnKey: keyof Instructor) => {
    const newOrder = sortOrder[columnKey] === "ascend" ? "descend" : "ascend";
    const sortedData = [...data].sort((a, b) => {
      let aValue: string | undefined | "admin" | "instructor" | "student" | boolean | Date = a[columnKey];
      let bValue: string | undefined | "admin" | "instructor" | "student" | boolean | Date = b[columnKey];

      if (columnKey === "created_at" || columnKey === "updated_at") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        aValue = new Date(aValue).getTime();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return newOrder === "ascend" ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        return newOrder === "ascend" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return 0;
      }
    });

    setData(sortedData);
    setSortOrder((prev) => ({ ...prev, [columnKey]: newOrder }));
  };

  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps["confirm"], dataIndex: DataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Instructor> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
    onFilter: (value, record) =>
        (record[dataIndex]?.toString().toLowerCase().includes((value as string).toLowerCase())) || false,
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

  const columns : TableColumnsType<Instructor> = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createdDate: string) => formatDate(createdDate),
      sorter: true,
      sortDirections: ["descend", "ascend"],
      onHeaderCell: () => ({
        onClick: () => sortColumn("created_at"),
      }),
      width: "15%",
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (updatedDate: string) => formatDate(updatedDate),
      sorter: true,
      sortDirections: ["descend", "ascend"],
      onHeaderCell: () => ({
        onClick: () => sortColumn("updated_at"),
      }),
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
      key: "status",
      dataIndex: "status",
      width: "10%",
      render: (status: boolean) => (
          <Switch defaultChecked={status} onChange={(checked) => console.log(`switch to ${checked}`)} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: Instructor) => (
          <div>
            <EditOutlined
                className="hover:cursor-pointer text-blue-400 hover:opacity-60"
                style={{ fontSize: "20px" }}
            />
            <DeleteOutlined
                onClick={() => handleDelete(record._id, record.email)}
                className="ml-5 text-red-500 hover:cursor-pointer hover:opacity-60"
                style={{ fontSize: "20px" }}
            />
          </div>
      ),
    },
  ];

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
                  title: "Manage Instructors",
                },
              ]}
          />
          <div className="py-2">
            <Button type="primary">Add New Instructor</Button>
          </div>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
  );
};

export default AdminManageInstructors;
