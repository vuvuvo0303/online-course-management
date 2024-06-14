import { Breadcrumb, Rate, Space, Table } from "antd";
import type { TableProps } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { fetchReviews } from "../../../services/get";
import { DeleteOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";

type DataType = {
  key: string;
  name: string;
  message: number;
  rating: number;
  tags: string[];
};
const ManageAdminFeedbacks = () => {
  const [dataSource, setDataSource] = useState([]);
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchReviews();
      setDataSource(response);
      console.log(response);
    };

    fetchData();
  }, []);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Course Name",
      dataIndex: "title",
      key: "messtitleage",
    },
    {
      title: "Feedback",
      dataIndex: "message",
      key: "message",
      width: "30%",

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
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate allowHalf defaultValue={rating} />,
    },

    {
      title: "Action",
      key: "action",
      render: () => (
        <div>
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
            title: "Manage Feedbacks",
          },
        ]}
      />
      <Table columns={columns} dataSource={dataSource} />;
    </div>
  );
};

export default ManageAdminFeedbacks;
