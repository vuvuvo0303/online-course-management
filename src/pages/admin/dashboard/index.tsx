import { FileDoneOutlined, PlaySquareOutlined, TeamOutlined } from "@ant-design/icons";
import { Badge, Card, Col, Row } from "antd";
import { UserChart } from "../chart/userchart";
import { RevenueChart } from "../chart/revenuechart";
// import top1 from "../../../assets/top1.png";
// import top2 from "../../../assets/top2.png";
// import top3 from "../../../assets/top3.png";
import { useCallback, useEffect, useState } from "react";
import { paths } from "../../../consts";
// import { Course } from "../../../models";
import CustomBreadcrumb from "../../../components/breadcrumb";
import { getBlogs, getCourses } from "../../../services";
import { getUsers } from "../../../services/users";

const AdminDashboard: React.FC = () => {
  //const [topCourses, setTopCourses] = useState([]);
  const [numBlogs, setNumBlogs] = useState(0);
  const [numCourses, setNumCourses] = useState(0);
  const [numStudents, setNumStudents] = useState(0);
  const [numInstructors, setNumInstructors] = useState(0);

  const fetchData = useCallback(async () => {
    const blogs = await getBlogs();
    const courses = await getCourses("", "", "", 1, 100);
    const students = await getUsers("", "student");
    const instructors = await getUsers("", "instructor");
    const totalBlogs = blogs.data.pageInfo.totalItems
    const totalCourses = courses.data.pageInfo.totalItems
    const totalStudents = students.data.pageInfo.totalItems
    const totalInstructors = instructors.data.pageInfo.totalItems



    // Sort courses by number of sales in descending order
    // const sortedCourses = courses.sort();

    // Take the top 3 courses
    // const top3Courses = sortedCourses.slice(0, 3);

    // setTopCourses(top3Courses);
    setNumBlogs(totalBlogs);
    setNumCourses(totalCourses);
    setNumStudents(totalStudents);
    setNumInstructors(totalInstructors);
  }, [])

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CustomBreadcrumb currentTitle="Dashboard" currentHref={paths.ADMIN_HOME} />
      <div className="flex justify-between drop-shadow-xl gap-4">
        <Badge.Ribbon text="FLearn" color="blue">
          <Card title="Total courses in the system" bordered={false} style={{ width: 300 }}>
            <div className="flex justify-center gap-2">
              <h1>{numCourses}</h1>
              <PlaySquareOutlined style={{ fontSize: "20px", color: "red" }} />
            </div>
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="FLearn" color="orange">
          <Card title="Total Student in the system" bordered={false} style={{ width: 300 }}>
            <div className="flex justify-center gap-2">
              <h1>{numStudents}</h1>
              <TeamOutlined style={{ fontSize: "20px", color: "gray" }} />
            </div>
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="FLearn" color="green">
          <Card title="Total Instructor in the system" bordered={false} style={{ width: 300 }}>
            <div className="flex justify-center gap-2">
              <h1>{numInstructors}</h1>
              <TeamOutlined style={{ fontSize: "20px", color: "gray" }} />
            </div>
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="FLearn" color="red">
          <Card title="Total Blogs in the system" bordered={false} style={{ width: 300 }}>
            <div className="flex justify-center gap-2">
              <h1>{numBlogs}</h1>
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

        </Row>
      </div>
    </>
  );
};

export default AdminDashboard;
