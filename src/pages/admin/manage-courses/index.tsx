import { useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, HomeOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Breadcrumb, Button, Image, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

import { format } from "date-fns";
import { fetchCourses } from "../../../services/get";
import { Course } from "../../../models";
import axios from "axios";
import { toast } from "react-toastify";


type DataIndex = keyof Course;

const AdminManageCourses: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [data, setData] = useState<Course[]>([]);
  const [sortOrder, setSortOrder] = useState<{ [key: string]: "ascend" | "descend" }>({
    duration: "ascend",
    createdDate: "ascend",
    updatedDate: "ascend",
  });




  const handleDelete = async (courseId: string, title: string) => {
    try {
      await axios.delete(`https://665fbf245425580055b0b23d.mockapi.io/courses/${courseId}`);
      const updatedData = data.filter(course => course.courseId !== courseId);
      setData(updatedData);
      toast.success(`Delete course ${title} successfully`);
    } catch (error) {
      toast.error(`Delete course ${title} failed`);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  const sortCourseByCreatedDate = (courses: Course[]) => {
    return courses.sort((a, b) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime();
      return dateB - dateA;
    })
  }

  const sortColumn = (columnKey: keyof Course) => {
    const newOrder = sortOrder[columnKey] === "ascend" ? "descend" : "ascend";
    const sortedData = [...data].sort((a, b) => {
      let aValue: string | number | boolean = a[columnKey];
      let bValue: string | number | boolean = b[columnKey];

      // Chuyển đổi giá trị thành số nếu đó là ngày tháng hoặc duration
      if (columnKey === "createdDate" || columnKey === "updatedDate") {
        // @ts-ignore
        aValue = new Date(aValue).getTime();
        // @ts-ignore
        bValue = new Date(bValue).getTime();
      } else if (columnKey === "duration") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      // Đảm bảo rằng cả aValue và bValue đều là số hoặc chuỗi trước khi so sánh
      if (typeof aValue === "number" && typeof bValue === "number") {
        if (newOrder === "ascend") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        if (newOrder === "ascend") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else {
        return 0; // Trường hợp không so sánh được
      }
    });

    setData(sortedData);
    setSortOrder((prev) => ({ ...prev, [columnKey]: newOrder }));
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await fetchCourses();
        const sortedCourses = sortCourseByCreatedDate(courses);
        setData(sortedCourses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Course> => ({
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

  const columns: TableColumnsType<Course> = [
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
      sorter: true,
      sortDirections: ["descend", "ascend"],
      render: (text) => `${text} hours`,
      onHeaderCell: () => ({
        onClick: () => sortColumn("duration"),
      }),
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      render: (createdDate: string) => formatDate(createdDate),
      onHeaderCell: () => ({
        onClick: () => sortColumn("createdDate"),
      }),
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      key: "updatedDate",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      render: (updatedDate: string) => formatDate(updatedDate),
      onHeaderCell: () => ({
        onClick: () => sortColumn("updatedDate"),
      }),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "25%",
    },
    {
      title: "Image",
      dataIndex: "courseImgUrl",
      key: "courseImgUrl",
      render: (courseImgUrl: string) => <Image src={courseImgUrl} width={100} />,
    },
    {
      title: "Action",
      key: "action",
      render: (record: Course) => (
          <div>
            <EditOutlined
                className="hover:cursor-pointer text-blue-400 hover:opacity-60"
                style={{ fontSize: "20px" }}
            />
            <DeleteOutlined
                onClick={() => handleDelete(record.courseId, record.title)}
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
        {" "}
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
        />
      </div>
      {<Table columns={columns} dataSource={data} />}
    </div>
  );
};

export default AdminManageCourses;