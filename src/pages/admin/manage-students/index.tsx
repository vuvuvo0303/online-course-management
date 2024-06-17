import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb, Button, Image, Switch, Table } from "antd";
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

const AdminManageStudents: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete(`https://665fbf245425580055b0b23d.mockapi.io/students/${userId}`);
      const updatedData = data.filter(student => student.userId !== userId);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://665fbf245425580055b0b23d.mockapi.io/students");
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
        <Switch defaultChecked={isActive} onChange={(checked) => console.log(`switch to ${checked}`)} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: DataType) => (
        <div>
          <EditOutlined
            className="hover:cursor-pointer text-blue-400 hover:opacity-60"
            style={{ fontSize: "20px" }}
          />
          <DeleteOutlined
            onClick={() => handleDelete(record.userId)}
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

export default AdminManageStudents;
