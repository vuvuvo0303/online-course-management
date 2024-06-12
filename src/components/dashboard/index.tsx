import { useEffect, useState } from "react";
import {
  CommentOutlined,
  DesktopOutlined,
  FundProjectionScreenOutlined,
  ProfileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Layout, Menu, Space, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    const user = sessionStorage.getItem("user");
    if (userRole && user) {
      setRole(userRole);
      setFullName(JSON.parse(user).fullName);
    } else {
      navigate("/login"); // Redirect to login if role is not found
    }
  }, [navigate]);

  function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
      key,
      icon,
      children,
      label: <Link to={String(key)}>{label}</Link>,
    } as MenuItem;
  }

  function loadItems() {
    if (role === "Instructor") {
      setItems([getItem("Manage Lectures", "/instructor/dashboard/manage-lectures", <DesktopOutlined />)]);
    } else if (role === "Admin") {
      setItems([
        getItem("Manage Students", "/admin/dashboard/manage-students", <TeamOutlined />),
        getItem("Manage Instructors", "/admin/dashboard/manage-instructors", <TeamOutlined />),
        getItem("Manage Courses", "/admin/dashboard/manage-courses", <FundProjectionScreenOutlined />),
        getItem("Manage Blogs", "/admin/dashboard/manage-blogs", <ProfileOutlined />),
        getItem("Manage Feedbacks", "/admin/dashboard/manage-feedbacks", <CommentOutlined />),
      ]);
    }
  }

  useEffect(loadItems, [role]);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dropdownItems: MenuProps["items"] = [
    {
      label: <p className="text-sm">Welcome: {fullName}</p>,
      key: "1",
    },
    {
      label: <p className="text-sm">Role: {role}</p>,
      key: "2",
    },
    {
      label: <p className="text-sm hover:cursor-pointer hover:text-red-600">Logout</p>,
      key: "3",
    },
  ];
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu className="py-4 bg-white-50 h-full  " defaultSelectedKeys={["1"]} mode="vertical" items={items} />
        </Sider>
        <Layout className="bg-stone-100">
          <Header className="flex justify-between items-center drop-shadow-xl bg-white ">
            <img
              
              src="https://fsoft-academy.edu.vn/dao-tao-lap-trinh/public/media/lt-logo.png"
              alt=" logo"
              width={100}
            />
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
