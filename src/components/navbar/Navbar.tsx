import { Menu, Dropdown, Badge, Space, MenuProps, Row, Col, Avatar, Popover, Button } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { paths } from '../../consts/index';
import { ShoppingCartOutlined, UserOutlined, MailOutlined, BellOutlined, HeartOutlined, CheckOutlined, MenuOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SearchTool from '../SearchTool';
import "./nav.css"
import Drawer from '../Drawer';

const Navbar: React.FC = () => {
  // const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const location = useLocation();
  const [dataUser, setDataUser] = useState<{ role: string | null, fullName: string | null, email: string | null }>({ role: null, fullName: null, email: null });
  const isLoginOrRegister = location.pathname === paths.LOGIN || location.pathname === paths.REGISTER;
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Điều kiện màn hình nhỏ
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isForgotPassword = location.pathname === '/forgot-password';
  // Create a submenu for each categoryFilter

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        setDataUser({ role: userData.role, fullName: userData.fullName, email: userData.email });
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  const dropdownItems: MenuProps["items"] = [
    {
      label: (
        <div className="text-sm">
          <Row>
            <Col span={8} className='pl-3 pt-2 pb-2'>
              <Avatar
                src="https://images.unsplash.com/photo-1693533846949-5df11d41642e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnB0fGVufDB8fDB8fHww"
                className="hover:cursor-pointer"
                size={50}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={16} className='pt-3 pr-3'>
              <Row>
                <p className='text-base font-bold'>{dataUser.fullName}</p>
                <CheckOutlined className="ml-2" />
              </Row>
              <div>
                <p className='text-base'>{dataUser.email}</p>
              </div>
            </Col>
          </Row>
          <div className="mt-2 text-lg font-bold">
            <Link className='hover:text-red-600' to={"/profile"}>View {dataUser.role} Profile</Link>
          </div>
        </div>
      ),
      key: "1",
    },
    {
      label:
        <Link className="text-lg" to={"/payment-history"}>Payment History</Link>,
      key: "2",
    },
    {
      label:
        <Link className="text-lg" to={"/help"}>Help</Link>,
      key: "3",
    },
    {
      label:
        <Link className="text-lg" to={"/sendFeedBack"}>Send Feedback</Link>,
      key: "4",
    },
    {
      label: <p onClick={handleLogout} className="text-lg hover:cursor-pointer hover:text-red-600">Logout</p>,
      key: "5",
    },
  ];

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const { avatarUrl } = userData;

  // const handleMenuClick = () => {
  //   setMobileMenuVisible(!mobileMenuVisible);
  // };

  const shopCartContent = (
    <div className="p-4">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <div className="hover:bg-slate-300 p-5 mb-4 rounded-lg transition-all duration-200 ease-in-out">
          <Link to={"/"}>
            <Row className="mb-4 items-center">
              <div className="flex items-start space-x-4">
                <div className="w-1/4">
                  <img
                    src="https://img-b.udemycdn.com/course/480x270/567828_67d0.jpg"
                    alt=""
                    className="w-full rounded-lg mb-2"
                  />
                </div>
                <div className="w-3/4 mt-2">
                  <div className="truncate">
                    100 Days of Code: The Complete Python Pro...
                  </div>
                </div>
              </div>
              <Col span={6} className="flex justify-end">
                <span>₫2,199,000</span>
              </Col>
            </Row>
          </Link>
        </div>
        <div className="hover:bg-slate-300 p-5 mb-4 rounded-lg transition-all duration-200 ease-in-out">
          <Link to={"/"}>
            <Row className="mb-4 items-center">
              <Col span={6}>
                <img
                  src="https://img-b.udemycdn.com/course/480x270/567828_67d0.jpg"
                  alt=""
                  className="w-full rounded-lg"
                />
              </Col>
              <Col span={12}>
                <div className="truncate">
                  The Complete 2024 Web Development Bootcamp
                </div>
              </Col>
              <Col span={6} className="flex justify-end">
                <span>₫1,499,000</span>
              </Col>
            </Row>
          </Link>
        </div>
        <div className="mt-4 text-xl font-bold">
          <span>Total: ₫3,698,000</span>
        </div>
        <div className="mt-4">
          <Button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            <Link to={"/cart"} className="w-full h-full block text-center">Go to cart</Link>
          </Button>
        </div>
      </div>
    </div>
  );

  const heartContent = (
    <div className='p-1'>
      <div>
        <div className='hover:bg-slate-300 p-5'>
          <Link className='hover:bg-white' to={"/"}>
            <Row className="mb-4">
              <Col span={6}><img src="https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg" alt="" className="w-full" /></Col>
              <Col span={14} className="flex items-center">
                <div className="truncate">
                  The Complete 2024 Web Development Bootcamp
                </div>
              </Col>
              <Col span={4} className="flex items-center justify-end">
                <span>₫249,000</span>
              </Col>
            </Row>
          </Link>
        </div>
        <div className='hover:bg-slate-300 p-5'>
          <Link className='hover:bg-white' to={"/"}>
            <Row className="mb-4">
              <Col span={6}><img src="https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg" alt="" className="w-full" /></Col>
              <Col span={14} className="flex items-center">
                <div className="truncate">
                  The Complete 2024 Web Development Bootcamp
                </div>
              </Col>
              <Col span={4} className="flex items-center justify-end">
                <span>₫249,000</span>
              </Col>
            </Row>
          </Link>
        </div>
        <div className='hover:bg-slate-300 p-5'>
          <Link className='hover:bg-white' to={"/"}>
            <Row className="mb-4">
              <Col span={6}><img src="https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg" alt="" className="w-full" /></Col>
              <Col span={14} className="flex items-center">
                <div className="truncate">
                  The Complete 2024 Web Development Bootcamp
                </div>
              </Col>
              <Col span={4} className="flex items-center justify-end">
                <span>₫249,000</span>
              </Col>
            </Row>
          </Link>
        </div>
      </div>
      <div className='mt-4'>
        <Button><Link to={paths.STUDENT_ENROLLMENT}>View Cart</Link></Button>
      </div>
    </div>
  );

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to={paths.STUDENT_ENROLLMENT}>
          <Badge count={4}>
            <HeartOutlined className="text-gray-400 text-3xl" />
          </Badge>
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Badge count={2}>
          <MailOutlined className="text-gray-400 text-3xl" />
        </Badge>
      ),
      disabled: true,
    },
    {
      key: '3',
      label: (
        <Badge count={3}>
          <BellOutlined className="text-gray-400 text-3xl" />
        </Badge>
      ),
      disabled: true,
    },
    {
      key: '4',
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
            className={` ${isLoginOrRegister ? 'text-center ' : ''} max-h-30px`}
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
              <Link to={paths.STUDENT_ENROLLMENT}>
                <Popover content={heartContent} overlayClassName="cart-popover">
                  <Badge count={4}>
                    <HeartOutlined className="text-gray-400 text-3xl" />
                  </Badge>
                </Popover>
              </Link>
              <Badge count={2}>
                <MailOutlined className="text-gray-400 text-3xl" />
              </Badge>
              <Badge count={3}>
                <BellOutlined className="text-gray-400 text-3xl" />
              </Badge>
              <Link to={paths.STUDENT_CART}>
                <Popover content={shopCartContent} overlayClassName="cart-popover">
                  <Badge count={2}>
                    <ShoppingCartOutlined className="text-gray-400 text-3xl" />
                  </Badge>
                </Popover>
              </Link>
              {avatarUrl ? (
                <Dropdown className='mb-2' menu={{ items: dropdownItems }} trigger={["click"]} overlayClassName="w-72">
                  <p onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Avatar
                        src="https://images.unsplash.com/photo-1693533846949-5df11d41642e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnB0fGVufDB8fDB8fHww"
                        className="hover:cursor-pointer"
                        size={40}
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
