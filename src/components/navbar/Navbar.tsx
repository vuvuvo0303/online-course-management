import { Menu, Dropdown, Badge, Space, MenuProps, Row, Col, Avatar, Popover } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { paths } from '../../consts';
import { ShoppingCartOutlined, UserOutlined, MailOutlined, BellOutlined, HeartOutlined, MenuOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SearchTool from '../SearchTool';
import Drawer from '../Drawer';
import PopoverContent from '../PopoverContent';
import Popup from '../Popup';
import { checkTokenExpiration } from "../../services/auth.ts";


const Navbar: React.FC = () => {
  // const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const location = useLocation();
  const [dataUser, setDataUser] = useState<{ role: string | null; fullName: string | null; email: string | null; avatarUrl: string | null }>({
    role: null,
    fullName: null,
    email: null,
    avatarUrl: null,
  });
  const isLoginOrRegister = location.pathname === paths.LOGIN || location.pathname === paths.REGISTER;
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isForgotPassword = location.pathname === '/forgot-password';
  // Create a submenu for each categoryFilter
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (checkTokenExpiration(navigate)) {
      return;
    }
    if (user) {
      try {
        const userData = JSON.parse(user);
        setDataUser({ role: userData.role, fullName: userData.name, email: userData.email, avatarUrl: userData.avatar });
      } catch (error) {
        //
      }
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate(paths.HOME);
  };

  const dropdownItems: MenuProps["items"] = [
    {
      label: (
        <div className="text-sm">
          <Row>
            <Col span={8} className="pl-3 pt-2 pb-2">
              <Avatar
                src={dataUser.avatarUrl ? dataUser.avatarUrl : paths.AVATAR}
                className="hover:cursor-pointer mt-1"
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
          <div className="mt-2 text-lg font-bold">
            <Link className="hover:text-red-600" to={"/profile"}>
              View {dataUser.role} Profile
            </Link>
          </div>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <Link className="text-lg" to={"/payment-history"}>
          Payment History
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link className="text-lg" to={"/help"}>
          Help
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link className="text-lg" to={"/sendFeedBack"}>
          Send Feedback
        </Link>
      ),
      key: "4",
    },
    {
      label: (
        <p onClick={handleLogout} className="text-lg hover:cursor-pointer hover:text-red-600">
          Logout
        </p>
      ),
      key: "5",
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link to={paths.STUDENT_ENROLLMENT}>
          <Badge count={4}>
            <HeartOutlined className="text-gray-400 text-3xl" />
          </Badge>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Badge count={2}>
          <MailOutlined className="text-gray-400 text-3xl" />
        </Badge>
      ),
      disabled: true,
    },
    {
      key: "3",
      label: (
        <Badge count={3}>
          <BellOutlined className="text-gray-400 text-3xl" />
        </Badge>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: (
        <Link to={paths.STUDENT_CART}>
          <Badge count={2}>
            <ShoppingCartOutlined className="text-gray-400 text-3xl" />
          </Badge>
        </Link>
      ),
    },
  ];

  return (
    <nav className={`flexBetween navbar ${isLoginOrRegister ? 'justify-center' : ''}`}>
      <div className={`flex-1 flexStart gap-10 ${isLoginOrRegister ? 'justify-center' : ''}`}>
        <div>
          {!isLoginPage && !isRegisterPage && !isForgotPassword && <Drawer />}
        </div>
        <Link to="/">
          <img
            src="/logo.jpg"
            alt="FLearn Logo"
            className={` ${isLoginOrRegister ? 'place-items-center ' : ''} `}
            style={{ maxHeight: '40px' }}
          />
        </Link>
        <div>
          {!isLoginPage && !isRegisterPage && !isForgotPassword && <SearchTool />}
        </div>
      </div>
      {!isLoginOrRegister && !isForgotPassword && (
        <div className="flexCenter gap-10 mr-5">
          {isMobile ? (
            <Dropdown overlay={<Menu items={items} />} className='mt-5 mb-44' placement="bottomRight">
              <p onClick={(e) => e.preventDefault()}>
                <Space>
                  <MenuOutlined className="text-gray-400 text-3xl" />
                </Space>
              </p>
            </Dropdown>
          ) : (
            <>
              <Popover
                content={<PopoverContent />}
                overlayInnerStyle={{ padding: 0 }}
                trigger="hover"
                placement="bottom"
              >
                <Link to={paths.STUDENT_ENROLLMENT}>
                  <Badge count={4}>
                    <HeartOutlined className="text-gray-400 text-3xl" />
                  </Badge>
                </Link>
              </Popover>

              <Popover
                content={<Popup />}
                overlayInnerStyle={{ padding: 0 }}
                trigger="click"
                placement="bottom"
              >
                <Badge count={2}>
                  <MailOutlined className="text-gray-400 text-3xl" />
                </Badge>
              </Popover>

              <Popover
                content={<Popup />}
                overlayInnerStyle={{ padding: 0 }}
                trigger="click"
                placement="bottom"
              >
                <Badge count={3}>
                  <BellOutlined className="text-gray-400 text-3xl" />
                </Badge>
              </Popover>

              <Popover
                content={<PopoverContent />}
                overlayInnerStyle={{ padding: 0 }}
                trigger="hover"
                placement="bottom"
              >
                <Link to={paths.STUDENT_CART}>
                  <Badge count={2}>
                    <ShoppingCartOutlined className="text-gray-400 text-3xl" />
                  </Badge>
                </Link>
              </Popover>

              {user ? (
                <Dropdown className='mb-2' menu={{ items: dropdownItems }} trigger={["click"]} overlayClassName="w-72">
                  <p onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Avatar
                        src={dataUser.avatarUrl ? dataUser.avatarUrl : paths.AVATAR}
                        className="hover:cursor-pointer"
                        icon={<UserOutlined />}
                      />
                    </Space>
                  </p>
                </Dropdown>
              ) : (
                <Link to={paths.LOGIN}>
                  <UserOutlined className="text-gray-400 text-3xl cursor-pointer" />
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
