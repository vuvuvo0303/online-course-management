import { useEffect, useState } from 'react';
import {
  CheckOutlined,
  CommentOutlined,
  CopyOutlined,
  DesktopOutlined,
  FundOutlined,
  FundProjectionScreenOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Col, Dropdown, Layout, Menu, Row, Space, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { User } from '../../models/User';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [dataUser, setDataUser] = useState<{ role: string | null, fullName: string | null, email: string | null }>({ role: null, fullName: null, email: null });
  useEffect(() => {
    const userString = localStorage.getItem('user');
    const user: User = userString ? JSON.parse(userString) : null;
    const userRole = user?.role;

    if (userRole && user) {
      setRole(userRole);
      setFullName(user.fullName);
      setDataUser({ role: userRole, fullName: user.fullName, email: user.email });
    } else {
      navigate('/login'); // Redirect to login if role is not found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  // const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

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
      if (dataUser.role === "Instructor") {
        setItems([
          getItem("Dashboard", "/instructor/dashboard", <FundOutlined />),
          getItem("Manage Feedbacks", "/instructor/manage-feedbacks", <CommentOutlined />),
          getItem("Manage Courses", "/instructor/manage-courses", <FundProjectionScreenOutlined />),
          getItem("Manage Students", "/instructor/manage-students", <TeamOutlined />),
          getItem("Manage Blogs", "/instructor/manage-blogs", <CopyOutlined />),
          // getItem("My Profile", "/instructor/profile", <UserOutlined />),
          getItem("Create New Course", "/instructor/create-course", <DesktopOutlined />),
          getItem("Payment History", "/instructor/payment-history", <DesktopOutlined />),
        ]);
      } else if (dataUser.role === "Admin") {
        setItems([
          getItem("Dashboard", "/admin/dashboard", <FundOutlined />),
          getItem("My Profile", "/admin/profile", <UserOutlined />),
          getItem("Manage Students", "/admin/manage-students", <TeamOutlined />),
          getItem("Manage Instructors", "/admin/manage-instructors", <TeamOutlined />),
          getItem("Manage Categories", "/admin/manage-categories", <TeamOutlined />),
          getItem("Manage Courses", "/admin/manage-courses", <FundProjectionScreenOutlined />),
          getItem("Manage Blogs", "/admin/manage-blogs", <ProfileOutlined />),
          getItem("Manage Feedbacks", "/admin/manage-feedbacks", <CommentOutlined />),
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
            <Col span={8}>
              <Avatar
                src="https://images.unsplash.com/photo-1693533846949-5df11d41642e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnB0fGVufDB8fDB8fHww"
                className="hover:cursor-pointer "
                size={40}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={16}>
              <Row>
                <p className='text-lg font-bold font-bold'> {dataUser.fullName}</p>
                <CheckOutlined className="text-blue-500 ml-2" />
              </Row>
              <div>
                <p className='text-lg'> { }</p>
              </div>
            </Col>
          </Row>
          <div className="mt-2 text-lg">
            <Link className=" hover:text-red-600" to={dataUser.role === "Instructor" ? "/instructor/dashboard" : "/admin/dashboard"}>Cursus Dashboard</Link>
          </div>
          <div className="mt-2 text-lg">
            <Link className=" hover:text-red-600" to={dataUser.role === "Instructor" ? "/instructor/profile" : "/admin/profile"}>View Profile</Link>
          </div>
          <div className="mt-2 text-lg">
            <Link className=" hover:text-red-600" to={dataUser.role === "Instructor" ? "/instructor/paidMemberships" : "/admin/paidMemberships"}>Paid Memberships</Link>
          </div>
          <div className="mt-2 text-lg">
            <Link className=" hover:text-red-600" to={dataUser.role === "Instructor" ? "/instructor/setting" : "/admin/setting"}>Setting</Link>
          </div>
          <div className="mt-2 text-lg">
            <Link className=" hover:text-red-600" to={dataUser.role === "Instructor" ? "/instructor/help" : "/admin/help"}>Help</Link>
          </div>
          <div className="mt-2 text-lg">
            <Link className=" hover:text-red-600" to={dataUser.role === "Instructor" ? "/instructor/sendFeedBack" : "/admin/sendFeedBack"}>Send Feedback</Link>
          </div>
        </div>
      ),
      key: "1",
    },
    {
      label: <p className="text-lg">Role: {dataUser.role}</p>,
      key: "2",
    },
    {
      label: <p onClick={handleLogout} className="text-lg hover:cursor-pointer hover:text-red-600">Logout</p>,
      key: "3",
    },
  ];



  // const dropdownItems: MenuProps['items'] = [
  //   {
  //     label: <p className='text-sm'>Welcome: {fullName}</p>,
  //     key: '1',
  //   },
  //   {
  //     label: <p className='text-sm'>Role: {role}</p>,
  //     key: '2',
  //   },
  //   role === 'Instructor'
  //     ? {
  //       label: (
  //         <Link to='/instructor/profile'>
  //           <p className='text-sm'>My Profile</p>
  //         </Link>
  //       ),
  //       key: '3',
  //     }
  //     : null,
  //   {
  //     label: (
  //       <p onClick={handleLogout} className='text-sm hover:cursor-pointer hover:text-red-600'>
  //         Logout
  //       </p>
  //     ),
  //     key: '4',
  //   },
  // ];

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className='demo-logo-vertical' />
          <Menu className='py-4 bg-white-50 h-full' defaultSelectedKeys={['1']} mode='vertical' items={items} />
        </Sider>
        <Layout className='bg-stone-100'>
          <Header className='flex justify-between items-center drop-shadow-xl bg-white '>
            <img
              className=''
              src='https://th.bing.com/th/id/OIG1.AGaZbxlA_0MPJqC3KzeN?w=270&h=270&c=6&r=0&o=5&pid=ImgGn&fbclid=IwZXh0bgNhZW0CMTAAAR2mjW6RtojaN9vEo4rqlabcTxGB8SgLyPDBFuYQkrjrtV6Y-grTpfAFNfU_aem_AeDCUfxM5_fs-2v7HvGAmbOqmKCoSm3yqxolCEq2L3VhfsTEpP6R4EchWpg36dMdIMwS0hSCc_V3GDRIrdhhWCxz'
              alt=' logo'
              width={50}
            />
            <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    src='https://images.unsplash.com/photo-1693533846949-5df11d41642e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnB0fGVufDB8fDB8fHww'
                    className='hover:cursor-pointer '
                    size={40}
                    icon={<UserOutlined />}
                  />
                </Space>
              </a>
            </Dropdown>
          </Header>
          <Content className='' style={{ margin: '30px 10px' }}>
            <div
              style={{
                padding: '5px 20px',
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>@ 2024 FLearn. All rights reserved</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
