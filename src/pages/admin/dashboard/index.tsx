import { FileDoneOutlined, PlaySquareOutlined, TeamOutlined } from "@ant-design/icons";
import { Badge, Card, Col, Image, Rate, Row } from "antd";
import { Link } from "react-router-dom";
import { UserChart } from "../chart/userchart";
import { RevenueChart } from "../chart/revenuechart";
import top1 from "../../../assets/top1.png";
import top2 from "../../../assets/top2.png";
import top3 from "../../../assets/top3.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { API_CLIENT_GET_COURSES, paths } from "../../../consts/index";
import { Course } from "../../../models/Course";
import CustomBreadcrumb from "../../../components/breadcrumb";

const AdminDashboard: React.FC = () => {
  const [topCourses, setTopCourses] = useState([]);

  const fetchTop3Course = async () => {
    const res = await axiosInstance.post(API_CLIENT_GET_COURSES, {
      searchCondition: {
        keyword: "",
        category_id: "",
        is_deleted: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 1000, // Increase the page size to fetch all courses
      },
    });

    const courses = res.data.pageData || [];

    // Sort courses by number of sales in descending order
    const sortedCourses = courses.sort();

    // Take the top 3 courses
    const top3Courses = sortedCourses.slice(0, 3);

    setTopCourses(top3Courses);
  };

  useEffect(() => {
    fetchTop3Course();
  }, []);

  return (
    <>
      <CustomBreadcrumb currentTitle="Dashboard" currentHref={paths.ADMIN_HOME} />
      <div className="flex justify-between drop-shadow-xl gap-4">
        <Badge.Ribbon text="FLearn" color="blue">
          <Card title="Total courses in the system" bordered={false} style={{ width: 300 }}>
            <div className="flex justify-center gap-2">
              <h1>50</h1>
              <PlaySquareOutlined style={{ fontSize: "20px", color: "red" }} />
            </div>
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="FLearn" color="orange">
          <Link to={"manage-students"}>
            <Card title="Total Student in the system" bordered={false} style={{ width: 300 }}>
              <div className="flex justify-center gap-2">
                <h1>500</h1>
                <TeamOutlined style={{ fontSize: "20px", color: "gray" }} />
              </div>
            </Card>
          </Link>
        </Badge.Ribbon>

        <Badge.Ribbon text="FLearn" color="green">
          <Card title="Total Instructor in the system" bordered={false} style={{ width: 300 }}>
            <div className="flex justify-center gap-2">
              <h1>100</h1>
              <TeamOutlined style={{ fontSize: "20px", color: "gray" }} />
            </div>
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="FLearn" color="red">
          <Card title="Total Blogs in the system" bordered={false} style={{ width: 300 }}>
            <div className="flex justify-center gap-2">
              <h1>100</h1>
              <FileDoneOutlined style={{ fontSize: "20px", color: "blue" }} />
            </div>
          </Card>
        </Badge.Ribbon>
      </div>
      <div className="mt-9 drop-shadow-xl">
        <Row gutter={24}>
          <Col span={12}>
            <Card bordered={false}>
              <UserChart />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <RevenueChart />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="mt-6 drop-shadow-xl">
        <span className="font-bold text-lg text-rose-400">Top 3 best-selling courses in the system</span>
        <Row gutter={24} className="mt-2">
          {topCourses.map((course: Course, index) => (
            <Col span={8} key={course._id}>
              <Card bordered={false} className="hover:cursor-pointer">
                <div style={{ display: "flex", alignItems: "center" }} className="justify-between">
                  <span style={{ marginLeft: 10 }}>{course.name}</span>
                  <img src={index === 0 ? top1 : index === 1 ? top2 : top3} alt={`${course.name} course`} width={50} />
                </div>

                <div className="flex gap-5 items-center">
                  <Image src={course.image_url} width={150} height={100} />
                  <div className="gap-7">
                    <p className="text-gray-700 ">
                      Instructor: <Link to={""}>{course.instructor_name}</Link>
                    </p>
                    <p className="text-gray-700 ">
                      Category: <Link to={""}>{course.category_name}</Link>
                    </p>
                    <div className="flex gap-2">
                      {" "}
                      <p className="text-gray-700 ">Price: </p>
                      <p className="line-through">
                        {" "}
                        {course.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                      </p>
                    </div>

                    <p className="text-gray-700 ">Discount: {course.discount}%</p>
                    <p className="text-gray-700 ">
                      Price Paid: {course.price_paid.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-auto">
                  <div className="flex items-center gap-2">
                    <div>
                      <Rate allowHalf defaultValue={course.average_rating} className="mt-3 ml-3" />
                    </div>

                    <span className="mt-2 text-sm">({course.review_count})</span>
                  </div>

                  <div className="py-2 flex justify-end">
                    <span className="text-blue-500 cursor-pointer">See More</span>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default AdminDashboard;
