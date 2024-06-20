import { Menu, Dropdown, Badge, Space, MenuProps, Row, Col, Avatar, Popover, Button } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { categoryFilters, categorySubmenu, paths } from '../consts/index';
import { ShoppingCartOutlined, UserOutlined, MailOutlined, BellOutlined, HeartOutlined, CheckOutlined, MenuOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SearchTool from './SearchTool';
import "./nav.css"
const Navbar = () => {
  // const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const location = useLocation();
  const [dataUser, setDataUser] = useState<{ role: string | null, fullName: string | null, email: string | null }>({ role: null, fullName: null, email: null });
  const isLoginOrRegister = location.pathname === paths.LOGIN || location.pathname === paths.REGISTER;
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Điều kiện màn hình nhỏ
  const navigate = useNavigate();
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
            <Col span={8}>
              <Avatar
                src="https://images.unsplash.com/photo-1693533846949-5df11d41642e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnB0fGVufDB8fDB8fHww"
                className="hover:cursor-pointer"
                size={40}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={16}>
              <Row>
                <p className='text-base font-bold'>{dataUser.fullName}</p>
                <CheckOutlined className="text-blue-500 ml-2" />
              </Row>
              <div>
                <p className='text-base'>{dataUser.email}</p>
              </div>
            </Col>
          </Row>
          <div className="mt-2 text-lg font-bold">
            <Link className="hover:text-red-600" to={"/profile"}>View Profile</Link>
          </div>
          <div className="mt-2 text-lg">
            <Link className="hover:text-red-600" to={"/payment-history"}>Payment History</Link>
          </div>
          <div className="mt-2">
            <Link className="text-lg hover:text-red-600" to={"/setting"}>Setting</Link>
          </div>
          <div className="mt-2">
            <Link className="text-lg hover:text-red-600" to={"/help"}>Help</Link>
          </div>
          <div className="mt-2">
            <Link className="text-lg hover:text-red-600" to={"/sendFeedBack"}>Send Feedback</Link>
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

  const submenus = categoryFilters.map((filter, index) => (
    <Menu.SubMenu key={index} title={filter}>
      {categorySubmenu.map((submenu, subIndex) => (
        <Menu.Item key={subIndex}>
          <Link to={`/submenu/${submenu}`}>{submenu}</Link>
        </Menu.Item>
      ))}
    </Menu.SubMenu>
  ));

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const { avatarUrl } = userData;

  // const handleMenuClick = () => {
  //   setMobileMenuVisible(!mobileMenuVisible);
  // };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };


  const shopCartContent = (
    <div className='p-1'>
      <div>
        <div className='hover:bg-slate-300 p-5'>
          <Link className='hover:bg-white' to={"/"}>
            <Row className="mb-4">
              <Col span={6}><img src="https://img-b.udemycdn.com/course/480x270/567828_67d0.jpg" alt="" className="w-full" /></Col>
              <Col span={12} className="flex items-center">
                <div className="truncate">
                  The Complete Python Bootcamp From Zero to Hero in Python
                </div>
              </Col>
              <Col span={6} className="flex items-center justify-end">
                <span>₫349,000</span>
              </Col>
            </Row>
          </Link>
        </div>
        <div className='hover:bg-slate-300 p-5'>
          <Link className='hover:bg-white' to={"/"}>
            <Row className="mb-4">
              <Col span={6}><img src="https://img-b.udemycdn.com/course/480x270/567828_67d0.jpg" alt="" className="w-full" /></Col>
              <Col span={12} className="flex items-center">
                <div className="truncate">
                  The Complete Python Bootcamp From Zero to Hero in Python
                </div>
              </Col>
              <Col span={6} className="flex items-center justify-end">
                <span>₫349,000</span>
              </Col>
            </Row>
          </Link>
        </div>
        <div className='hover:bg-slate-300 p-5'>
          <Link className='hover:bg-white' to={"/"}>
            <Row className="mb-4">
              <Col span={6}><img src="https://img-b.udemycdn.com/course/480x270/567828_67d0.jpg" alt="" className="w-full" /></Col>
              <Col span={12} className="flex items-center">
                <div className="truncate">
                  The Complete Python Bootcamp From Zero to Hero in Python
                </div>
              </Col>
              <Col span={6} className="flex items-center justify-end">
                <span>₫349,000</span>
              </Col>
            </Row>
          </Link>
        </div>
      </div>
      <div className='mt-4 '>
        <Button><Link to={"/cart"}>View Cart</Link></Button>
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
        <Button><Link to={"/enrollment"}>View Cart</Link></Button>
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
        <Link to="/">
          <h1 className={`${isLoginOrRegister ? 'text-center' : ''}`}>FLearn</h1>
        </Link>
        {!isLoginOrRegister && (
          <>
            <Dropdown overlay={<Menu>{submenus}</Menu>} placement="bottomLeft">
              <a
                className="ant-dropdown-link"
                onMouseEnter={handleMouseEnter}
                style={{ fontSize: '14px', cursor: 'pointer' }}
              >
                Categories
              </a>
            </Dropdown>
            <Link to='/enrollment?activeTab=1'>
              <a className="link" style={{ fontSize: '14px' }}>
                Saved Courses
              </a>
            </Link>
            <Link to='/teaching'>
              <a className="link" style={{ fontSize: '14px' }}>
                Be an Instructors
              </a>
            </Link>
          </>
        )}
      </div>
      <SearchTool/>
      {!isLoginOrRegister && (
        <div className="flexCenter gap-10 mr-5">
          {isMobile ? (
            <Dropdown overlay={<Menu items={items} />} className='mt-5 mb-44' placement="bottomRight">
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MenuOutlined className="text-gray-400 text-3xl" />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <>
              <Link to={paths.STUDENT_ENROLLMENT}>
                <Popover content={heartContent} title="Wish List" overlayClassName="cart-popover border-2">
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
                <Popover content={shopCartContent} title="Selected Course" overlayClassName="cart-popover border-2">
                  <Badge count={2}>
                    <ShoppingCartOutlined className="text-gray-400 text-3xl" />
                  </Badge>
                </Popover>
              </Link>
              {avatarUrl ? (
                <Dropdown className='mb-2' menu={{ items: dropdownItems }} trigger={["click"]} overlayClassName="w-72">
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Avatar
                        src="https://images.unsplash.com/photo-1693533846949-5df11d41642e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnB0fGVufDB8fDB8fHww"
                        className="hover:cursor-pointer"
                        size={40}
                        icon={<UserOutlined />}
                      />
                    </Space>
                  </a>
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
