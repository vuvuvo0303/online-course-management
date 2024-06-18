import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb, Button, Image, Switch, Table } from "antd";
import { DeleteOutlined, EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { Student } from "../../../models";
import { toast } from "react-toastify";


const AdminManageStudents: React.FC = () => {
  const [data, setData] = useState<Student[]>([]);

  const handleDelete = async (userId: string, email: string) => {
    try {
      await axios.delete(`https://665fbf245425580055b0b23d.mockapi.io/students/${userId}`);
      const updatedData = data.filter(student => student.userId !== userId);
      setData(updatedData);
      toast.success(`Delete user ${email} successfully`);
    } catch (error) {
      toast.error(`Delete user ${email} failed`);
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
      width: "15%",
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      render: (updatedDate: string) => formatDate(updatedDate),
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
      render: (record: Student) => (
        <div>
          <EditOutlined
            className="hover:cursor-pointer text-blue-400 hover:opacity-60"
            style={{ fontSize: "20px" }}
          />
          <DeleteOutlined
            onClick={() => handleDelete(record.userId, record.email)}
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
