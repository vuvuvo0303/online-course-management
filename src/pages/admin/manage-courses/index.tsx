import { useEffect, useRef, useState } from "react";
import { HomeOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Breadcrumb, Button, Image, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

import { format } from "date-fns";
import { fetchCourses } from "../../../services/get";

interface DataType {
  key: string;
  title: string;
  createdDate: string;
  updatedDate: string;
  category: string;
  duration: string;
  price: string;
  level: number;
  courseImgUrl: string;
}

type DataIndex = keyof DataType;

const ManageCourses = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [dataSource, setDataSource] = useState([]);
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };
  useEffect(() => {
    const fetchcourses = async () => {
      const response = await fetchCourses();
      setDataSource(response);
      console.log(response);
    };

    fetchcourses();
  }, []);

  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps["confirm"], dataIndex: DataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
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
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
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

  const columns: TableColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "10%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      width: "10%",
      ...getColumnSearchProps("level"),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: "10%",
      sorter: (a, b) => a.duration.length - b.duration.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      render: (createdDate: string) => formatDate(createdDate),
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      render: (updatedDate: string) => formatDate(updatedDate),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
    },
    {
      title: "Image",
      dataIndex: "courseImgUrl",
      key: "courseImgUrl",
      render: (courseImgUrl: string) => <Image src={courseImgUrl} width={100} />,
    },
  ];
  return <div>
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
            title: "Manage Course",
          },
        ]}
      />{<Table columns={columns} dataSource={dataSource} />}</div>;
};

export default ManageCourses;
