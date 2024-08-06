import { PlaySquareOutlined, TeamOutlined } from "@ant-design/icons";
import { Badge, Card, Col, Modal, Row, Table } from "antd";
import { Link } from "react-router-dom";
import TopSelling from "./top3selling";
import TopNews from "./topnew";
import ProfileOverview from "./profile-overview";
import { useEffect, useState, useCallback } from "react";
import { paths } from "../../../consts";
import { getUserFromLocalStorage, getCourses, getUserDetail } from "../../../services";
import CustomBreadcrumb from "../../../components/breadcrumb";
import { formatCurrency, formatDate } from "../../../utils";
import { Transaction } from "../../../models";
import { TableProps } from "antd/lib";
const InstructorDashboard: React.FC = () => {
  const [numCourses, setNumCourses] = useState(0);
  const [numBalance, setNumBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const user = getUserFromLocalStorage();
  useEffect(() => {

    fetchData();
  }, [])

  const fetchData = useCallback(async () => {
  
    const courses = await getCourses();
    const userInfo = await getUserDetail(user._id);
    const totalCourses = courses.data.pageInfo.totalItems
    const balanceTotal = userInfo.data.balance_total;
    const transactionsOFInstructor = userInfo.data.transactions;
    setNumCourses(totalCourses);
    setNumBalance(balanceTotal);
    setTransactions(transactionsOFInstructor)
  }, [numBalance, numCourses])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columnsTransactions: TableProps<Transaction>["columns"] = [
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
    },
    {
      title: "Payout Amount",
      dataIndex: "payout_amount",
      key: "payout_amount ",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => formatDate(created_at),
    },
  ];
  return (
    
    <div>
      <Modal title="Transaction"
       open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
       footer={""}
       width={900}
       >
     <Table rowKey="_id" dataSource={transactions}  columns={columnsTransactions} />
      </Modal>
      <CustomBreadcrumb/>
      <div className="flex justify-between drop-shadow-xl gap-3">
        <Badge.Ribbon text="Flearn" color="blue">
          <Link to={paths.INSTRUCTOR_MANAGE_COURSES}>
            {" "}
            <Card title="Total courses " bordered={false} style={{ width: 300 }}>
              <div className="flex justify-between items-center px-5">
                {" "}
                <div className="flex justify-center gap-2">
                  <h1>{numCourses}</h1>
                  <PlaySquareOutlined style={{ fontSize: "20px", color: "red" }} />
                </div>
                <img src="https://cdn-icons-png.freepik.com/512/4762/4762311.png" width={50} />
              </div>
            </Card>
          </Link>
        </Badge.Ribbon>

        <Badge.Ribbon text="Flearn" color="orange">
          <Link to="/instructor/manage-students">
            <Card title="Total Student " bordered={false} style={{ width: 300 }}>
              <div className="flex justify-between items-center px-1">
                <div className="flex justify-center gap-2">
                  <h1>5000</h1>
                  <TeamOutlined style={{ fontSize: "20px", color: "gray" }} />
                </div>
                <img src="https://i.pngimg.me/thumb/f/720/m2i8G6i8d3N4G6m2.jpg" width={50} />
              </div>
            </Card>
          </Link>
        </Badge.Ribbon>

        <Badge.Ribbon text="Flearn" color="green">
          <Card title="Total Revenue" bordered={false} style={{ width: 300 }}>
            <div className="flex justify-between items-center px-1">
              <div className="flex justify-center gap-2">
                <h1  onClick={showModal} className="text-blue-500 cursor-pointer">{formatCurrency(numBalance)}</h1>
              </div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoA2JPklNgATSUB4vGt1RofKes7gQsE5zw7Q&s"
                width={50}
              />
            </div>
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="Flearn" color="red">
          <Card title="Total Enroll" bordered={false} style={{ width: 300 }}>
            <div className="flex justify-between items-center px-1">
              <div className="flex justify-center gap-2">
                <h1>100</h1>
                <TeamOutlined style={{ fontSize: "20px", color: "gray" }} />
              </div>
              <img src="https://cdn-icons-png.freepik.com/512/10782/10782052.png" width={50} />
            </div>
          </Card>
        </Badge.Ribbon>
      </div>
      <div className="mt-3 drop-shadow-xl ml-1">
        <Card bordered={false} style={{ width: "100%" }}>
          <div className="flex justify-between">
            <div className="flex items-center gap-9">
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/online-course-1482806-1255394.png"
                width={40}
              />
              <span className="text-2xl">Jump Into Manage Course </span>
            </div>
            <Link to="/instructor/manage-courses">
              <button className="bg-red-500 px-8 py-3 text-white rounded-lg hover:bg-black">Manage Course</button>
            </Link>
          </div>
        </Card>
      </div>
      <div className="mt-4 drop-shadow-xl">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Top 3 Best-Selling Courses" bordered={false}>
              <TopSelling />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Top 3 News" bordered={false}>
              <TopNews />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Profile Overview" bordered={false}>
              <ProfileOverview />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default InstructorDashboard;
