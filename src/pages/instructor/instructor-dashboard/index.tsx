import { PlaySquareOutlined, TeamOutlined } from "@ant-design/icons";
import { Badge, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import TopSelling from "./top3selling";
import TopNews from "./topnew";
import ProfileOverview from "./profile-overview";
import { useEffect, useState, useCallback } from "react";
import { paths } from "../../../consts";
import { getUserFromLocalStorage, getCourses, getUserDetail } from "../../../services";
import CustomBreadcrumb from "../../../components/breadcrumb";

const InstructorDashboard: React.FC = () => {
  const [numCourses, setNumCourses] = useState(0);
  const [numBalance, setNumBalance] = useState(0);
  const user = getUserFromLocalStorage();
  useEffect(() => {

    fetchData();
  }, [])

  const fetchData = useCallback(async () => {
    const courses = await getCourses();
    const userInfo = await getUserDetail(user._id);
    const totalCourses = courses.data.pageInfo.totalItems
    const balanceTotal = userInfo.data.balance_total;
    setNumCourses(totalCourses);
    setNumBalance(balanceTotal);
  }, [numBalance, numCourses])
  return (
    <div>
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
                <h1>{numBalance.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</h1>
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
