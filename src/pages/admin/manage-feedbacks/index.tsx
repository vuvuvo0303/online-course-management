import { Breadcrumb, Rate, Table } from "antd";
import type { TableProps } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { fetchReviews } from "../../../services/get";
import { DeleteOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Review } from "../../../models";

const AdminManageFeedbacks: React.FC = () => {
  const [data, setData] = useState<Review[]>([]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  const sortFeedbacksByCreatedDate = (feedbacks: Review[]) => {
    return feedbacks.sort((a, b) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime();
      return dateB - dateA;
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await fetchReviews();
        const sortedStudents = sortFeedbacksByCreatedDate(students);
        setData(sortedStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, []);
  const columns: TableProps<Review>["columns"] = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Course Name",
      dataIndex: "title",
      key: "title",
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
      <Table columns={columns} dataSource={data} />;
    </div>
  );
};

export default AdminManageFeedbacks;

