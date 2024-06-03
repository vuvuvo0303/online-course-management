// import React from 'react';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { NavLinks, categoryFilters } from '../consts/index';
import SearchTool from '../components/SearchTool';

const Navbar = () => {
    // Create a menu from the categoryFilters
    const menu = (
        <Menu>
            {categoryFilters.map((filter, index) => (
                <Menu.Item key={index}>
                    <Link to={`/filter/${filter}`}>{filter}</Link>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <nav className='flexBetween navbar'>
            <div className='flex-1 flexStart gap-10'>
                <Link to="/">
                    <h1>Home</h1>
                </Link>
                {/* Render Categories link as dropdown */}
                <Dropdown overlay={menu} placement="bottomLeft">
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
