import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { NavLinks, categoryFilters, categorySubmenu } from '../consts/index';
import SearchTool from '../components/SearchTool';

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

    return (
        <nav className='flexBetween navbar'>
            <div className='flex-1 flexStart gap-10'>
                <Link to="/">
                    <h1>FLearn</h1>
                </Link>
                {/* Render Categories link as dropdown */}
                <Dropdown overlay={<Menu>{submenus}</Menu>} placement="bottomLeft">
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        Categories
                    </a>
                </Dropdown>
                {/* Render NavLinks */}
                <ul className='xl:flex hidden text-small gap-7'>
                    {NavLinks.map(link => (
                        <li key={link.key}>
                            <Link to={link.href}>{link.text}</Link>
                        </li>
                    ))}
                </ul>

                <SearchTool />

            </div>

            <div className='flex-center gap-4'>

            </div>
        </nav>
    );
};

export default Navbar;
