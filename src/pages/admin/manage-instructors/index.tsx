import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb, Button, Image, Table, Tag } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
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

const ManageIntructors = () => {
  const [data, setData] = useState<DataType[]>([]);

  const handleDelete = async (userId: string) => {
    const response = await axios.delete(`https://665fbf245425580055b0b23d.mockapi.io/students/${userId}`);
    console.log(response);
    const listAfterDelete = data.filter((student) => student.userId !== userId);
    setData(listAfterDelete);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://665fbf245425580055b0b23d.mockapi.io/instructors");
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
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      title: "Image",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      render: (avatarUrl: string) => <Image src={avatarUrl} width={50} />,
    },
  
    {
      title: "Status",
      key: "isActive",
      dataIndex: "isActive",
      render: (isActive: boolean) => (
        <>
          <Tag color={isActive ? "green" : "volcano"}>{isActive ? "Active" : "Inactive"}</Tag>
        </>
      ),
    },

    {
      title: "Action",
      key: "userId",
      render: (userId: string) => (
        <Button type="primary" danger onClick={() => handleDelete(userId)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ManageIntructors;
