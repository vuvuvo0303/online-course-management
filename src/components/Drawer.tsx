import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, Space, Avatar, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { paths } from '../consts'; // Adjust import as needed
import { logout } from "../services/auth";
import axiosInstance from '../services/axiosInstance';
import { API_CLIENT_GET_CATEGORIES } from '../consts';
import { Category } from 'models/Category';

const SideBar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryLoading, setCategoryLoading] = useState(false);
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
        if (user) {
            const userData = JSON.parse(user);
            setDataUser({ role: userData.role, fullName: userData.name, email: userData.email, avatarUrl: userData.avatar });
        }
    }, [user]);

    // Fetch categories from API
    const fetchCategories = useCallback(async () => {
        setCategoryLoading(true);
        try {
            const response = await axiosInstance.post(API_CLIENT_GET_CATEGORIES, {
                searchCondition: {
                    status: true,
                    is_deleted: false,
                },
                pageInfo: {
                    pageNum: 1, // Fetch first page or adjust as needed
                    pageSize: 100, // Adjust page size as needed
                },
            });

            if (response.data) {
                setCategories(response.data.pageData || []);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setCategoryLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        logout(navigate);
        window.location.reload(); // Reload the page after logout
    };

    return (
        <>
            <Space>
                <MenuOutlined
                    className="mt-1 cursor-pointer"
                    onClick={showDrawer}
                    style={{ fontSize: '1.5rem' }}
                />
            </Space>
            <Drawer
                placement={placement}
                closable={true}
                onClose={onClose}
                open={open}
                key={placement}
                width={300}
                style={{ padding: 0 }}
            >
                <div className="p-4">
                    <div className="flex items-center">
                        <Link to={paths.LOGIN}>
                            <Avatar
                                size="large"
                                src={dataUser.avatarUrl || paths.AVATAR}
                                className="bg-purple-500 mr-3"
                            >
                                {dataUser.fullName ? dataUser.fullName[0] : 'U'}
                            </Avatar>
                        </Link>
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
                <div className="p-4 border-b">
                    <div className="font-semibold text-gray-900 text-base">Categories</div>
                    {categoryLoading ? (
                        <div>Loading categories...</div>
                    ) : (
                        categories.length === 0 ? (
                            <div>No categories available</div>
                        ) : (
                            categories.map((category) => (
                                <Link
                                    key={category._id}
                                    to={`/courses/${category.name}`}
                                    className="block text-gray-600 cursor-pointer hover:text-gray-900 text-sm mt-2"
                                    onClick={onClose}
                                >
                                    {category.name}
                                </Link>
                            ))
                        )
                    )}
                </div>
                <div className="p-4">
                    <div className="font-semibold text-gray-900 text-base">More from Flearn</div>
                    <Link to={paths.TEACHING} onClick={onClose} className="link text-sm">
                        Be an Instructor
                    </Link>
                </div>
                {dataUser.fullName && (
                    <Button
                        type="default"
                        onClick={handleLogout}
                        className="text-lg hover:text-red-600 mt-4"
                    >
                        Logout
                    </Button>
                )}
            </Drawer>
        </>
    );
};

export default SideBar;
