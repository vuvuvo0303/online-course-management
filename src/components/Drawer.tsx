import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Space, Avatar } from 'antd';
import { MenuOutlined, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { categoryFilters, categoryCourse } from '../consts/index';

const SideBar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [courseOpen, setCourseOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [placement] = useState<'left'>('left');
    const [userData, setUserData] = useState<{ fullName: string | null, avatarUrl: string | null }>({
        fullName: null,
        avatarUrl: null,
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                setUserData({ fullName: parsedUser.fullName, avatarUrl: parsedUser.avatarUrl });
            } catch (error) {
                console.error('Error parsing user data from localStorage', error);
            }
        }
    }, []);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setCourseOpen(false);
        setSelectedCategory(null);
    };

    const openSubmenu = (category: string) => {
        setSelectedCategory(category);
        setCourseOpen(true);
    };

    const closeSubmenu = () => {
        setCourseOpen(false);
        setSelectedCategory(null);
    };

    return (
        <>
            <Space>
                <MenuOutlined className="mt-1 cursor-pointer pl-6" onClick={showDrawer} style={{ fontSize: '1.5rem' }} />
            </Space>
            <Drawer
                placement={placement}
                closable={true}
                onClose={onClose}
                visible={open}
                key={placement}
                width={300}
                bodyStyle={{ padding: 0 }}
            >
                <div className="p-4">
                    <div className="flex items-center">
                        <Avatar size="large" src={userData.avatarUrl} className="bg-purple-500 mr-3">
                            {userData.fullName ? userData.fullName[0] : 'U'}
                        </Avatar>
                        <div>
                            <div className="font-bold text-lg">Hi, {userData.fullName || 'Guest'}</div>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-b">
                    <div className="font-semibold text-gray-900 text-base">My Learning</div>
                    <Link to="/enrollment?activeTab=1" onClick={onClose} className="link text-sm">
                        Saved Courses
                    </Link>
                </div>
                {!courseOpen && (
                    <div className="p-4 border-b">
                        <div className="font-semibold text-gray-900 text-base">Most popular</div>
                        {categoryFilters.map((category, index) => (
                            <div
                                key={index}
                                className="flex justify-between text-gray-600 cursor-pointer hover:text-gray-900 text-sm mt-2"
                                onClick={() => openSubmenu(category)}
                            >
                                {category}
                                <CaretRightOutlined />
                            </div>
                        ))}
                    </div>
                )}
                {courseOpen && selectedCategory && (
                    <div className="p-4 border-b">
                        <div className="flex items-center mb-4">
                            <CaretLeftOutlined className="cursor-pointer mr-2" onClick={closeSubmenu} />
                            <div className="font-semibold text-gray-900 text-base">{selectedCategory}</div>
                        </div>
                        {categoryCourse[selectedCategory].map((subcategory, index) => (
                            <div key={index} className="text-gray-600 cursor-pointer hover:text-gray-900 text-sm mt-2">
                                {subcategory}
                            </div>
                        ))}
                    </div>
                )}
                <div className="p-4">
                    <div className="font-semibold text-gray-900 text-base">More from Udemy</div>
                    <Link to="/teaching" onClick={onClose} className="link text-sm">
                        Be an Instructor
                    </Link>
                </div>
            </Drawer>
        </>
    );
};

export default SideBar;
