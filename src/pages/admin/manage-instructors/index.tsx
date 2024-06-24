import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb, Button, Image, Switch, Table } from "antd";
import { DeleteOutlined, EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { Instructor } from "../../../models";
import { toast } from "react-toastify";


const AdminManageIntructors: React.FC = () => {
  const [data, setData] = useState<Instructor[]>([]);

  const handleDelete = async (userId: string, email: string) => {
    try {
      await axios.delete(`https://665fbf245425580055b0b23d.mockapi.io/instructors/${userId}`);
      const listAfterDelete = data.filter((student) => student.userId !== userId);
      setData(listAfterDelete);
      toast.success(`Delete user ${email} successfully`)
    } catch (error) {
      toast.error(`Delete user ${email} failed`)
    }
  };

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get("https://665fbf245425580055b0b23d.mockapi.io/instructors");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchInstructors();
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

export default AdminManageIntructors;
