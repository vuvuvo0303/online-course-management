import { useEffect, useState } from "react";
import {
  CheckOutlined,
  CommentOutlined,
  CopyOutlined,
  DesktopOutlined,
  FolderViewOutlined,
  FundOutlined,
  FundProjectionScreenOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Col, Dropdown, Layout, Menu, Row, Space, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import logo2 from "../../assets/logo2.jpg";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [dataUser, setDataUser] = useState<{
    role: string | null;
    fullName: string | null;
    email: string | null;
  }>({
    role: null,
    fullName: null,
    email: null,
  });
  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user: User = userString ? JSON.parse(userString) : null;
    const userRole = user?.role;

    console.log(role, fullName);

    if (userRole && user) {
      setRole(userRole);
      setFullName(user.name);
      setDataUser({
        role: userRole,
        fullName: user.name,
        email: user.email,
      });
    } else {
      navigate("/login"); // Redirect to login if role is not found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

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
      if (dataUser.role === "instructor") {
        setItems([
          getItem("Dashboard", "/instructor/dashboard", <FundOutlined />),
          getItem("Manage Feedbacks", "/instructor/manage-feedbacks", <CommentOutlined />),
          getItem("Manage Courses", "/instructor/manage-courses", <FundProjectionScreenOutlined />),
          getItem("Manage All Sessions", "/instructor/manage-all-sessions", <DesktopOutlined />),
          getItem("Manage Students", "/instructor/manage-students", <TeamOutlined />),
          getItem("Manage Blogs", "/instructor/manage-blogs", <CopyOutlined />),
          // getItem("My Profile", "/instructor/profile", <UserOutlined />),
          getItem("Create New Course", "/instructor/create-course", <FolderViewOutlined />),
          getItem("Payment History", "/instructor/payment-history", <WalletOutlined />),
          getItem("Tools", "/instructor/tools", <ToolOutlined />),
          getItem("Resources", "/instructor/resources", <QuestionCircleOutlined />),
        ]);
      } else if (dataUser.role === "admin") {
        setItems([
          getItem("Dashboard", "/admin/dashboard", <FundOutlined />),
          getItem("Manage Users", "/admin/manage-users", <TeamOutlined />),

          getItem("Manage Categories", "/admin/manage-categories", <TeamOutlined />),
          getItem("Manage Courses", "/admin/manage-courses", <FundProjectionScreenOutlined />),
          getItem("Manage Blogs", "/admin/manage-blogs", <ProfileOutlined />),
          getItem("Manage Feedbacks", "/admin/manage-feedbacks", <CommentOutlined />),
          getItem("Payment History", "/admin/payment-history", <DesktopOutlined />),
        ]);
      }
    }

    loadItems();
  }, [dataUser.role]);
  // useEffect(loadItems, [role]);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dropdownItems: MenuProps["items"] = [
    {
      label: (
        <div className="text-sm">
          <Row>
            <Col span={8} className="pl-3 pt-2 pb-2">
              <Avatar
                src="https://images.unsplash.com/photo-1693533846949-5df11d41642e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnB0fGVufDB8fDB8fHww"
                className="hover:cursor-pointer"
                size={50}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={16} className="pt-3 pr-3">
              <Row>
                <p className="text-base font-bold">{dataUser.fullName}</p>
                <CheckOutlined className="ml-2" />
              </Row>
              <div>
                <p className="text-md">{dataUser.email}</p>
              </div>
            </Col>
          </Row>
          <div className="mt-2 text-lg font-bold">
            {dataUser.role === "admin" ? (
              ""
            ) : (
              <Link className="hover:text-red-600" to={"/instructor/profile"}>
                View {dataUser.role} Profile
              </Link>
            )}
          </div>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          className="mt-2 text-lg"
          to={dataUser.role === "Instructor" ? "/instructor/paidMemberships" : "/admin/paidMemberships"}
        >
          Paid Memberships
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link className="text-lg" to={dataUser.role === "Instructor" ? "/instructor/setting" : "/admin/setting"}>
          Setting
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link className="text-lg" to={dataUser.role === "Instructor" ? "/instructor/help" : "/admin/help"}>
          Help
        </Link>
      ),
      key: "4",
    },
    {
      label: (
        <Link
          className="text-lg"
          to={dataUser.role === "Instructor" ? "/instructor/sendFeedBack" : "/admin/sendFeedBack"}
        >
          Send Feedback
        </Link>
      ),
      key: "5",
    },
    {
      label: (
        <p onClick={handleLogout} className="text-lg hover:cursor-pointer hover:text-red-600">
          Logout
        </p>
      ),
      key: "6",
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu className="py-4 bg-white-50 h-full" defaultSelectedKeys={["1"]} mode="vertical" items={items} />
        </Sider>
        <Layout className="bg-stone-100">
          <Header className="flex justify-between items-center drop-shadow-xl bg-white ">
            <img className="" src={logo2} alt=" logo" width={60} />

            <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    src="https://images.unsplash.com/photo-1693533846949-5df11d41642e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnB0fGVufDB8fDB8fHww"
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
