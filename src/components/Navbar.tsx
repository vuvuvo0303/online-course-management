import { Menu, Dropdown, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { NavLinks, categoryFilters, categorySubmenu } from '../consts/index';
import SearchTool from '../components/SearchTool';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

const Navbar = () => {
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

  // Get user data from sessionStorage
  const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
  const { avatarUrl } = userData;

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link to="/">
          <h1>FLearn</h1>
        </Link>
        {/* Render Categories link as dropdown */}
        <Dropdown overlay={<Menu>{submenus}</Menu>} placement="bottomLeft">
          <a
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
            style={{ fontSize: '14px' }} // Adjust the font size here
          >
            Categories
          </a>
        </Dropdown>
        {/* Render NavLinks */}
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <li key={link.key}>
              <Link to={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-10 mr-5">
        <SearchTool />
        {/* Add Badge component to display badge count */}
        <Badge count={5}>
          <ShoppingCartOutlined className="text-gray-400 text-3xl" />
        </Badge>
        {/* Render User Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
        ) : (
          <Link to="/login">
            <UserOutlined className="text-gray-400 text-3xl cursor-pointer" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
