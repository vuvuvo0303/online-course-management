import { FileDoneOutlined, PlaySquareOutlined, TeamOutlined } from "@ant-design/icons";
import { Badge, Card, Col, Image, Rate, Row } from "antd";
import { Link } from "react-router-dom";
import { UserChart } from "../chart/userchart";
import { RevenueChart } from "../chart/revenuechart";
import top1 from "../../../assets/top1.png";
import top2 from "../../../assets/top2.png";
import top3 from "../../../assets/top3.png";
const Statics = () => {
  return (
    <>
      {" "}
      <div className="flex justify-between drop-shadow-xl gap-4">
      <Badge.Ribbon text="Flearn" color="blue">
      <Card title="Total courses in the system" bordered={false} style={{ width: 300 }}>
          <div className="flex justify-center gap-2">
            <h1>50</h1>
            <PlaySquareOutlined style={{ fontSize: "20px", color:"red" }} />
          </div>
        </Card>
    </Badge.Ribbon>
        
    <Badge.Ribbon text="Flearn" color="orange">
        <Link to={"manage-students"}>
          <Card title="Total Student in the system" bordered={false} style={{ width: 300 }}>
            <div className="flex justify-center gap-2">
              <h1>500</h1>
              <TeamOutlined style={{ fontSize: "20px", color:"gray" }} />
            </div>
          </Card>
        </Link>
        </Badge.Ribbon>

        <Badge.Ribbon text="Flearn" color="green">
        <Card title="Total Instructor in the system" bordered={false} style={{ width: 300 }}>
          <div className="flex justify-center gap-2">
            <h1>100</h1>
            <TeamOutlined style={{ fontSize: "20px", color:"gray"  }} />
          </div>
        </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="Flearn" color="red">
        <Card title="Total Blogs in the system" bordered={false} style={{ width: 300 }}>
          <div className="flex justify-center gap-2">
            <h1>100</h1>
            <FileDoneOutlined style={{ fontSize: "20px",color:"blue"  }} />
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
          <Col span={8}>
            <Card bordered={false} className="hover:cursor-pointer">
              <div style={{ display: "flex", alignItems: "center" }} className="justify-between">
                <span style={{ marginLeft: 10 }}>Reactjs course</span>
                <img src={top1} alt="Reactjs course" width={50} />
              </div>

              <div className="flex gap-5 items-center">
                <Image
                  src="https://th.bing.com/th/id/OIP.GZUY5_68fSQ5j1_x0vfexgHaEK?rs=1&pid=ImgDetMain"
                  width={150}
                  height={100}
                />
                <div className="gap-7">
                  <p className="text-gray-700 ">
                    Instructor: <Link to={""}>Tript</Link>
                  </p>
                  <p className="text-gray-700 ">Price: 100000</p>
                  <p className="text-gray-700 ">
                    Category: <Link to={""}>Frontend</Link>
                  </p>
                  <p className="text-gray-700">Total sold: 150 courses</p>
                </div>
              </div>
              <div className="flex flex-col mt-auto">
                <Rate allowHalf defaultValue={5} className="mt-3 ml-3" />
                <div className="py-2 flex justify-end">
                  <span className="text-blue-500 cursor-pointer">See More</span>
                </div>
              </div>
            </Card>
          </Col>

          <Col span={8}>
            <Card bordered={false} className="hover:cursor-pointer">
              <div style={{ display: "flex", alignItems: "center" }} className="justify-between">
                <span style={{ marginLeft: 10 }}>TailWind course</span>
                <img src={top2} alt="TailWind course" width={50} />
              </div>
              <div className="flex gap-5 items-center">
                <Image
                  src="https://th.bing.com/th/id/OIP.AvpmhSP2e8GguzR4CUT5dQHaEy?rs=1&pid=ImgDetMainhttps://th.bing.com/th/id/OIP.AvpmhSP2e8GguzR4CUT5dQHaEy?rs=1&pid=ImgDetMain"
                  width={150}
                  height={100}
                />
                <div className="gap-7">
                  <p className="text-gray-700 ">
                    Instructor: <Link to={""}>Vinh NV</Link>
                  </p>
                  <p className="text-gray-700 ">Price: 10000</p>
                  <p className="text-gray-700 ">
                    Category: <Link to={""}>Frontend</Link>
                  </p>
                  <p className="text-gray-700">Total sold: 140 courses</p>
                </div>
              </div>
              <div className="flex flex-col mt-auto">
                <Rate allowHalf defaultValue={4.5} className="mt-3 ml-3" />
                <div className="py-2 flex justify-end">
                  <span className="text-blue-500 cursor-pointer">See More</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} className="hover:cursor-pointer">
              <div style={{ display: "flex", alignItems: "center" }} className="justify-between">
                <span style={{ marginLeft: 10 }}>Antd course</span>
                <img src={top3} alt="Antd course" width={50} />
              </div>
              <div className="flex gap-5 items-center">
                <Image
                  src="https://pic1.zhimg.com/v2-fd3257bb65fceb34187ae9298fd241d5_b.jpg"
                  width={150}
                  height={100}
                />
                <div className="gap-7">
                  <p className="text-gray-700 ">
                    Instructor:<Link to={""}>Khanh KT</Link>
                  </p>
                  <p className="text-gray-700 ">Price: 100000</p>
                  <p className="text-gray-700 ">
                    Category: <Link to={""}>Frontend</Link>
                  </p>
                  <p className="text-gray-700">Total sell: 100 courses</p>
                </div>
              </div>
              <div className="flex flex-col mt-auto">
                <Rate allowHalf defaultValue={4} className="mt-3 ml-3" />
                <div className="py-2 flex justify-end">
                  <span className="text-blue-500 cursor-pointer">See More</span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Statics;
