import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb, Button, Image, Switch, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { format } from "date-fns";

interface DataType {
  key: string;
  fullName: string;
  email: string;
  createdDate: string;
  updatedDate: string;
  isActive: boolean;
  avatarUrl: string;
  userId: string;
}

const ManageStudent = () => {
  const [data, setData] = useState<DataType[]>([]);
  const onChange = (isActive: boolean) => {
    console.log(`switch to ${isActive}`);
  };
  const handleDelete = async (userId: string) => {
    const response = await axios.put(`https://665fbf245425580055b0b23d.mockapi.io/students/${userId}`);
    console.log(response);
    const listAfterDelete = data.filter((student) => student.userId !== userId);
    setData(listAfterDelete);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://665fbf245425580055b0b23d.mockapi.io/students");
        console.log(response.data);

        setData(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };
  const columns = [
    {
      title: "UserID",
      dataIndex: "userId",
      key: "userId",
      render: (text: string) => <a>{text}</a>,
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string) => <a>{text}</a>,
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      render: (createdDate: string) => formatDate(createdDate),
      width: "10%",
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      render: (updatedDate: string) => formatDate(updatedDate),
      width: "10%",
    },
    {
      title: "Image",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      render: (avatarUrl: string) => <Image src={avatarUrl} width={50} />,
    },
    {
      title: "Status",
      key: "isActive",
      dataIndex: "isActive",
      width: "10%",

      render: (isActive: boolean) => (
        <>
          <Switch defaultChecked onChange={onChange} />
        </>
      ),
    },

    {
      title: "Action",
      key: "userId",
      render: (userId: string) => (
        <div>
          <EditOutlined className="hover:cursor-pointer text-blue-400 hover:opacity-60" style={{ fontSize: "20px" }} />
          <DeleteOutlined
            className="ml-5 text-red-500 hover:cursor-pointer hover:opacity-60 "
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
              href: "/",
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
              title: "Manage Students",
            },
          ]}
        />
        <div className="py-2">
          <Button type="primary">Add New Students</Button>
        </div>
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ManageStudent;
