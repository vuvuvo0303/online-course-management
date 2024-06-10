// src/routes/AppRouter.tsx

import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Home, LoginPage, RegisterPage, Terms, Policy, Guidelines, Support, InstructorPage, Contact, ManageStudent, ManageInstructor, ManageBlogs, ManageCourses, ManageFeedbacks, Dashboard, ManageLectures } from '../pages';
import BlogList from '../pages/blog';
import BlogDetail from '../pages/blog/blogDetail';

const AppRouter: React.FC = () => {
    const userRole = sessionStorage.getItem('role');
    const navigate = useNavigate();

    // Hàm kiểm tra quyền truy cập của người dùng
    const canAccess = (allowedRoles: string[]) => {
        return userRole && allowedRoles.includes(userRole);
    };

    // Hàm điều hướng dựa trên vai trò của người dùng
    const redirectBasedOnRole = () => {
        switch (userRole) {
            case 'Student':
                navigate('/');
                break;
            case 'Admin':
                navigate('/admin/dashboard');
                break;
            case 'Instructor':
                navigate('/instructor/dashboard');
                break;
            default:
                navigate('/');
                break;
        }
    };

    // useEffect để điều hướng khi trang được load
    useEffect(() => {
        if (!userRole) {
            navigate('/');
        } else {
            redirectBasedOnRole();
        }
    }, [userRole, navigate]);

    // Hàm điều hướng theo route cụ thể cho Admin
    const redirectAdminRoutes = (path: string) => {
        // Danh sách các route admin
        const adminRoutes = [
            '/admin/dashboard',
            '/admin/manage-students',
            '/admin/manage-instructors',
            '/admin/manage-blogs',
            '/admin/manage-courses',
            '/admin/manage-feedbacks',
        ];

        // Kiểm tra nếu đường dẫn nằm trong adminRoutes
        if (userRole === 'Admin' && !adminRoutes.includes(path)) {
            return <Navigate to="/admin/dashboard" />;
        }

        return null;
    };

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/terms/policy" element={<Policy />} />
            <Route path="/terms/guidelines" element={<Guidelines />} />
            <Route path="/support" element={<Support />} />

            {/* Instructor routes */}
            <Route
                path="/instructor"
                element={canAccess(['Instructor']) ? <InstructorPage /> : redirectBasedOnRole()}
            />
            <Route
                path="/instructor/dashboard/*"
                element={canAccess(['Instructor']) ? <Dashboard /> : redirectBasedOnRole()}
            />

            {/* Admin routes */}
            <Route
                path="/admin/dashboard/*"
                element={canAccess(['Admin']) ? <Dashboard /> : redirectBasedOnRole()}
            />
            <Route
                path="/admin/manage-students"
                element={canAccess(['Admin']) ? <ManageStudent /> : redirectAdminRoutes('/admin/manage-student')}
            />
            <Route
                path="/admin/manage-instructors"
                element={canAccess(['Admin']) ? <ManageInstructor /> : redirectAdminRoutes('/admin/manage-instructor')}
            />
            <Route
                path="/admin/manage-blogs"
                element={canAccess(['Admin']) ? <ManageBlogs /> : redirectAdminRoutes('/admin/manage-blogs')}
            />
            <Route
                path="/admin/manage-courses"
                element={canAccess(['Admin']) ? <ManageCourses /> : redirectAdminRoutes('/admin/manage-courses')}
            />
            <Route
                path="/admin/manage-feedbacks"
                element={canAccess(['Admin']) ? <ManageFeedbacks /> : redirectAdminRoutes('/admin/manage-feedbacks')}
            />

            {/* Other routes */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />

            {/* Default route */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;
