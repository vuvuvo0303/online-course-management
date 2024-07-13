import { useState, useEffect } from 'react';
import { paths } from '../consts';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, Space, Avatar } from 'antd';
import { MenuOutlined, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { categoryFilters, categoryCourse } from '../consts/index';
import { checkTokenExpiration } from "../services/auth.ts";

const SideBar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [courseOpen, setCourseOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const navigate = useNavigate();
    const [placement] = useState<'left'>('left');
    const [dataUser, setDataUser] = useState<{ role: string | null; fullName: string | null; email: string | null; avatarUrl: string | null }>({
        role: null,
        fullName: null,
        email: null,
        avatarUrl: null,
    });

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
                <MenuOutlined className="mt-1 cursor-pointer " onClick={showDrawer} style={{ fontSize: '1.5rem' }} />
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
                        <Avatar size="large"
                            src={dataUser.avatarUrl ? dataUser.avatarUrl : paths.AVATAR}
                            className="bg-purple-500 mr-3">
                            {dataUser.fullName ? dataUser.fullName[0] : 'U'}
                        </Avatar>
                        <div>
                            <div className="font-bold text-lg">Hi, {dataUser.fullName || 'Guest'}</div>
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
                    <div className="font-semibold text-gray-900 text-base">More from Flearn</div>
                    <Link to="/teaching" onClick={onClose} className="link text-sm">
                        Be an Instructor
                    </Link>
                </div>
            </Drawer>
        </>
    );
};

export default SideBar;
