import { Menu, Dropdown, Badge, Space, MenuProps, Row, Col, Avatar, Popover, Button, Drawer } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { categoryFilters, categorySubmenu, paths } from '../consts/index';
import { ShoppingCartOutlined, UserOutlined, MailOutlined, BellOutlined, HeartOutlined, CheckOutlined, MenuOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SearchTool from './SearchTool';
import "./nav.css";
import axios from 'axios';
import { Category, SubCategory } from '../models';

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const location = useLocation();
  const [dataUser, setDataUser] = useState<{ role: string | null, fullName: string | null, email: string | null, avatarUrl: string | null }>({ role: null, fullName: null, email: null, avatarUrl: null });
  const isLoginOrRegister = location.pathname === paths.LOGIN || location.pathname === paths.REGISTER;
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [subDrawerVisible, setSubDrawerVisible] = useState(false);
  const [categoryId, setCategoryId] = useState<string>("");
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        setDataUser({ role: userData.role, fullName: userData.fullName, email: userData.email, avatarUrl: userData.avatarUrl });
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get<Category[]>(`https://665fbf245425580055b0b23d.mockapi.io/categories`);
        if (res) {
          setCategories(res.data);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategory();
  }, []);


  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const res = await axios.get<SubCategory[]>(`https://665fbf245425580055b0b23d.mockapi.io/subCategories`);
        if (res) {
          console.log("check res: ", res)
          setSubCategories(res.data.filter(SubCategory => SubCategory.cateId === categoryId));
          console.log("check categoryId: ", categoryId)
          console.log("check subCategories: ", subCategories)
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchSubCategory();
  }, [categoryId]);

  const dropdownItems: MenuProps["items"] = [
    {
      label: (
        <div className="text-sm">
          <Row>
            <Col span={8}>
              <Avatar
                src={dataUser.avatarUrl}
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
        <Button><Link to={"/enrollment"}>View Wish List</Link></Button>
      </div>
    </div>
  );

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const showSubDrawer = () => {
    // setDrawerVisible(false);
    setSubDrawerVisible(true);
  };

  const onCloseSubDrawer = () => {
    setSubDrawerVisible(false);
  };


  const subDrawerMenu = (
    <Menu>
      {subCategories.map(subCate => (
        <Menu.Item key={subCate.subCateId}>
          <Link to={`/category/${subCate.subCateId}`}>{subCate.subCateName}</Link>
        </Menu.Item>
      ))}
    </Menu>)

  const drawerMenu = (
    <Menu>
      <Menu.Item key="7">
        {dataUser.fullName ? (
          <Row>
            <Col span={6}>
              <Avatar
                src={dataUser.avatarUrl}
                className="hover:cursor-pointer"
                size={40}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={18}>
              <p>Hi, {dataUser.fullName}</p>
              <p>Welcome back</p>
            </Col>
          </Row>
        ) : (
          <Link to={paths.LOGIN}>
            <UserOutlined className="text-gray-400 text-3xl cursor-pointer" />
          </Link>
        )}
      </Menu.Item>
      {categories.map(cate => (
        <Menu.Item key={cate.id} >
          <button onClick={() => {
            setDrawerVisible(false);
            setCategoryId(cate.id);
            console.log("check cate.id: ", cate.id)
            showSubDrawer();
          }}>{cate.cateName}</button>
          <Drawer
            size={'default'}
            title="Menu"
            placement="left"
            onClose={onCloseSubDrawer}
            visible={subDrawerVisible}
            className="custom-drawer"
          >
            {subDrawerMenu}
          </Drawer>
        </Menu.Item>
      ))}
      <Menu.Item key="2">
        <Link to='/enrollment?activeTab=1'>Saved Courses</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to='/teaching'>Be an Instructor</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {!isLoginOrRegister && (
        <nav className={`flexBetween navbar ${isLoginOrRegister ? 'justify-center' : ''}`}>
          <div className={`flex-1 flexStart gap-10 ${isLoginOrRegister ? 'justify-center' : ''}`}>
            <Link to="/">
              <h1 className={`${isLoginOrRegister ? 'text-center' : ''}`}>FLearn</h1>
            </Link>
            {!isLoginOrRegister && !isMobile && (
              <>
                <Dropdown overlay={<Menu>{submenus}</Menu>} placement="bottomLeft">
                  <a className="ant-dropdown-link" style={{ fontSize: '14px', cursor: 'pointer' }}>
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
                    Be an Instructor
                  </a>
                </Link>
              </>
            )}
          </div>
          <SearchTool />
          {!isLoginOrRegister && (
            <div className="flexCenter gap-10 mr-5">
              {isMobile ? (
                <>
                  <Button type="primary" onClick={showDrawer} icon={<MenuOutlined />}>
                    Menu
                  </Button>
                  <Drawer
                    size={'default'}
                    title="Menu"
                    placement="left"
                    onClose={onClose}
                    visible={drawerVisible}
                  >
                    {drawerMenu}
                  </Drawer>
                </>
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
                  {dataUser.fullName ? (
                    <Dropdown overlay={<Menu items={dropdownItems} />} trigger={["click"]} overlayClassName="w-72">
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
      )}
    </>
  );
  
    
  }
export default Navbar;
