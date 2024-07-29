import { useEffect, useState } from "react";
import {
  CommentOutlined,
  DesktopOutlined,
  FundOutlined,
  OrderedListOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Col, Dropdown, Layout, Menu, Row, Space, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import logo2 from "../../assets/logo2.jpg";
import { paths, roles } from "../../consts";
import { getUserFromLocalStorrage, logout } from "../../services/auth.ts";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [dataUser, setDataUser] = useState<{
    role: string | null;
    fullName: string | null;
    email: string | null;
  }>({
    role: null,
    fullName: null,
    email: null,
  });

  const user: User = getUserFromLocalStorrage();
  useEffect(() => {
    if (user) {
      setDataUser({
        role: user.role,
        fullName: user.name,
        email: user.email,
      });
    }
  }, []);

  function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
      key,
      icon,
      children,
      label: <Link to={String(key)}>{label}</Link>,
    } as MenuItem;
  }
  useEffect(() => {
    function loadItems() {
      if (dataUser.role === roles.INSTRUCTOR) {
        setItems([
          getItem("Dashboard", paths.INSTRUCTOR_DASHBOARD, <FundOutlined />),
          getItem("Manage Reviews", "/instructor/manage-reviews", <CommentOutlined />),
          getItem(
            "Manage Courses",
            "/instructor/manage-courses",
            <img
              src="https://cdn2.iconfinder.com/data/icons/learning-1/64/video-tutorial-clip-online-course-256.png"
              width={18}
            />,
            [
              getItem("Manage All Sessions", "/instructor/manage-all-sessions", <DesktopOutlined />),
              getItem("Manage All Lessons", "/instructor/manage-all-lessons", <DesktopOutlined />),
            ]
          ),

          getItem("Manage Subscriptions", "/instructor/manage-subscriptions", <PlusCircleOutlined />),
          getItem("Manage Purchases", "/instructor/manage-purchases", <ShoppingCartOutlined />),
          getItem("Manage Payouts", "/instructor/manage-payouts", <OrderedListOutlined />),
          getItem("Tools", "/instructor/tools", <ToolOutlined />),
          getItem("Resources", "/instructor/resources", <QuestionCircleOutlined />),
        ]);
      } else if (dataUser.role === roles.ADMIN) {
        setItems([
          getItem("Dashboard", paths.ADMIN_DASHBOARD, <FundOutlined />),
          getItem("Manage Users", "/admin/manage-users", <TeamOutlined />),
          getItem("Instructor's Request", "/admin/instructor-requests", <TeamOutlined />),
          getItem("Manage Purchases", "/admin/manage-all-purchase", <ShoppingCartOutlined />),

          getItem("Manage Categories", "/admin/manage-categories", <UnorderedListOutlined />),
          getItem(
            "Manage Courses",
            "/admin/manage-courses",
            <img
              src="https://cdn2.iconfinder.com/data/icons/learning-1/64/video-tutorial-clip-online-course-256.png"
              width={18}
            />
          ),
          getItem("Manage Blogs", "/admin/manage-blogs", <ProfileOutlined />),
          getItem("Manage Reviews", "/admin/manage-reviews", <CommentOutlined />),
          getItem("Manage Payouts", "/admin/manage-payouts", <OrderedListOutlined />),
        ]);
      }
    }

    loadItems();
  }, [dataUser.role]);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dropdownItems: MenuProps["items"] = [
    {
      label: (
        <div className="text-sm">
          <Row>
            <Col span={8} className="p-5 pt-2 pb-2">
              <Avatar
                src={typeof user.avatar === "string" ? user.avatar : undefined}
                className="hover:cursor-pointer bg-black"
                size={50}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={16} className="pt-3 pr-3">
              <Row>
                <p className="text-base font-bold">{dataUser.fullName}</p>
              </Row>
              <div>
                <p className="text-xs">{dataUser.email}</p>
              </div>
            </Col>
          </Row>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <Link className="text-lg" to={"/profile"}>
          View {dataUser.role} Profile
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link
          className="mt-2 text-lg"
          to={dataUser.role === roles.INSTRUCTOR ? "/instructor/paidMemberships" : "/admin/paidMemberships"}
        >
          Paid Memberships
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link className="text-lg" to={dataUser.role === roles.INSTRUCTOR ? "/instructor/setting" : "/admin/setting"}>
          Setting
        </Link>
      ),
      key: "4",
    },
    {
      label: (
        <Link className="text-lg" to={dataUser.role === roles.INSTRUCTOR ? "/instructor/help" : "/admin/help"}>
          Help
        </Link>
      ),
      key: "5",
    },
    {
      label: (
        <Link
          className="text-lg"
          to={dataUser.role === roles.INSTRUCTOR ? "/instructor/sendFeedBack" : "/admin/sendFeedBack"}
        >
          Send Feedback
        </Link>
      ),
      key: "6",
    },
    {
      label: (
        <p onClick={() => logout(navigate)} className="text-lg hover:cursor-pointer hover:text-red-600">
          Logout
        </p>
      ),
      key: "7",
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={230}>
          <div className="demo-logo-vertical" />
          <Menu className="py-4 bg-white-50 h-full " defaultSelectedKeys={["1"]} mode="inline" items={items} />
        </Sider>
        <Layout className="bg-stone-100">
          <Header className="flex justify-between items-center drop-shadow-xl bg-white ">
            <img className="" src={logo2} alt=" logo" width={60} />

            <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    src={typeof user.avatar === "string" ? user.avatar : undefined}
                    className="hover:cursor-pointer "
                    size={40}
                    icon={<UserOutlined />}
                  />
                </Space>
              </a>
            </Dropdown>
          </Header>
          <Content className="" style={{ margin: "30px 10px" }}>
            <div
              style={{
                padding: "5px 20px",
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>@ 2024 FLearn. All rights reserved</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
