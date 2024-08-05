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
import logo2 from "../../assets/logo2.jpg";
import { paths, roles } from "../../consts";
import { getUserFromLocalStorage, logout } from "../../services";

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


  const user = getUserFromLocalStorage();
  const userRole = user?.role;
  useEffect(() => {
    if (userRole && user) {
      setDataUser({
        role: userRole,
        fullName: user.name,
        email: user.email,
      });
    }
  }, [userRole]);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label: <Link to={String(key)}>{label}</Link>,
    } as MenuItem;
  }
  useEffect(() => {
    loadItems();
  }, [dataUser.role]);

  const loadItems = async () => {
    if (dataUser.role === roles.INSTRUCTOR) {
      setItems([
        getItem("Dashboard", paths.INSTRUCTOR_DASHBOARD, <FundOutlined />),
       
        getItem(
          "Manage Courses",
          "/instructor/manage-courses",
          <img
            src="https://cdn2.iconfinder.com/data/icons/learning-1/64/video-tutorial-clip-online-course-256.png"
            width={18}
          />,
          [
            getItem(
              "Manage All Sessions",
              "/instructor/manage-all-sessions",
              <DesktopOutlined />
            ),
            getItem(
              "Manage All Lessons",
              "/instructor/manage-all-lessons",
              <DesktopOutlined />
            ),
          ]
        ),

        getItem(
          "Manage Subscriptions",
          "/instructor/manage-subscriptions",
          <PlusCircleOutlined />
        ),
        getItem(
          "Manage Purchases",
          "/instructor/manage-purchases",
          <ShoppingCartOutlined />
        ),
        getItem(
          "My Purchases",
          "/instructor/purchase",
          <ShoppingCartOutlined />
        ),
        getItem(
          "Manage Payouts",
          "/instructor/manage-payouts",
          <OrderedListOutlined />
        ),
        getItem("Learn", "/instructor/learn", <FundOutlined />),
        getItem("Tools", "/instructor/tools", <ToolOutlined />),
        getItem(
          "Resources",
          "/instructor/resources",
          <QuestionCircleOutlined />
        ),
      ]);
    } else if (dataUser.role === roles.ADMIN) {
      setItems([
        getItem("Dashboard", "/admin/dashboard", <FundOutlined />),
        getItem("Manage Users", "/admin/manage-users", <TeamOutlined />),
        getItem(
          "Instructor's Request",
          "/admin/instructor-requests",
          <TeamOutlined />
        ),
        getItem(
          "Manage Courses",
          "/admin/manage-courses",
          <img
            src="https://cdn2.iconfinder.com/data/icons/learning-1/64/video-tutorial-clip-online-course-256.png"
            width={18}
          />
        ),
        getItem(
          "Manage Purchases",
          "/admin/manage-all-purchase",
          <ShoppingCartOutlined />
        ),
        getItem(
          "Manage Payouts",
          "/admin/manage-payouts",
          <OrderedListOutlined />
        ),
        getItem(
          "Manage Categories",
          "/admin/manage-categories",
          <UnorderedListOutlined />
        ),
        getItem("Manage Reviews", "/admin/manage-reviews", <CommentOutlined />),
        getItem("Manage Blogs", "/admin/manage-blogs", <ProfileOutlined />),
      ]);
    }
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dropdownItems: MenuProps["items"] =
    dataUser.role === roles.INSTRUCTOR
      ? [
        {
          label: (
            <div className="text-sm">
              <Row>
                <Col span={8} className="p-4 pt-2 pb-2">
                  <Avatar
                    src={
                      typeof user.avatar === "string"
                        ? user.avatar
                        : undefined
                    }
                    className="hover:cursor-pointer mr-5 border border-black"
                    size={50}
                    icon={<UserOutlined />}
                  />
                </Col>
                <Col span={16} className="pt-3 pr-3">
                  <Row>
                    <p className="text-base font-bold">{dataUser.fullName}</p>
                  </Row>
                  <div>
                    <p className="text-md">{dataUser.email}</p>
                  </div>
                </Col>
              </Row>
            </div>
          ),
          key: "1",
        },
        {
          label: (
            <Link className="text-lg" to={paths.INSTRUCTOR_PROFILE}>
              View Profile
            </Link>
          ),
          key: "2",
        },
        {
          label: (
            <p
              onClick={() => logout(navigate)}
              className="text-lg hover:cursor-pointer hover:text-red-600"
            >
              Logout
            </p>
          ),
          key: "3",
        },
      ]
      : [
        {
          label: (
            <button
              onClick={() => logout(navigate)}
              className="text-lg hover:cursor-pointer hover:text-red-600 bg-transparent border-none p-0"
            >
              Logout
            </button>
          ),
          key: "1",
        },
      ];
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}width={230}>
          <div className="demo-logo-vertical" />
          <Menu
            className="py-4 bg-white-50 h-full "
            defaultSelectedKeys={["2"]}
            mode="inline"
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Sider>
        <Layout className="bg-stone-100">
          <Header className="flex justify-between items-center drop-shadow-xl bg-white">
            <img className="" src={logo2} alt="logo" width={60} />

            {dataUser.role === roles.INSTRUCTOR ? (
              <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Avatar
                      src={
                        typeof user.avatar === "string"
                          ? user.avatar
                          : undefined
                      }
                      className="hover:cursor-pointer border border-black"
                      size={40}
                      icon={<UserOutlined />}
                    />
                  </Space>
                </a>
              </Dropdown>
            ) : (
              <Space>
                <button
                  onClick={() => logout(navigate)}
                  className="text-base text-white border border-red-300 bg-red-500 hover:border-red-700 hover:bg-red-700 px-3 py-1 rounded transition-colors duration-300"
                >
                  Logout
                </button>
              </Space>
            )}
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
          <Footer style={{ textAlign: "center" }}>
            @ 2024 FLearn. All rights reserved
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
