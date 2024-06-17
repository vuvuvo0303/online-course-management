import { Menu, Dropdown, Badge } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { categoryFilters, categorySubmenu, paths } from '../consts/index';
import SearchTool from './SearchTool';
import { ShoppingCartOutlined, UserOutlined, MailOutlined, BellOutlined, HeartOutlined } from '@ant-design/icons';
// import { useState } from 'react';

const Navbar = () => {
  // const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const location = useLocation();
  const isLoginOrRegister = location.pathname === paths.LOGIN || location.pathname === paths.REGISTER;

  // Create a submenu for each categoryFilter
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
<<<<<<< HEAD

  // const handleMenuClick = () => {
  //   setMobileMenuVisible(!mobileMenuVisible);
  // };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };
=======
// if you use , you can remove comment
  // const handleMenuClick = () => {
  //   setMobileMenuVisible(!mobileMenuVisible);
  // };
>>>>>>> origin/master

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

      {!isLoginOrRegister && (
        <div className="flexCenter gap-10 mr-5">
          <SearchTool />
          <Link to={paths.STUDENT_ENROLLMENT}>
            <Badge count={4}>
              <HeartOutlined className="text-gray-400 text-3xl" />
            </Badge>
          </Link>
          <Badge count={2}>
            <MailOutlined className="text-gray-400 text-3xl" />
          </Badge>
          <Badge count={3}>
            <BellOutlined className="text-gray-400 text-3xl" />
          </Badge>
          <Link to={paths.STUDENT_CART}>
            <Badge count={2}>
              <ShoppingCartOutlined className="text-gray-400 text-3xl" />
            </Badge>
          </Link>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
            />
          ) : (
            <Link to={paths.LOGIN}>
              <UserOutlined className="text-gray-400 text-3xl cursor-pointer" />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
