import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  LoginPage,
  RegisterPage,
  // Course,
  Terms,
  Policy,
  Guidelines,
  Support,
  Contact,
  ManageStudent,
  ManageInstructor,
  ManageBlogs,
  ManageCourses,
  Dashboard,
  BecomeInstructorPage,
  Cart,
  Profile,
  BlogDetail,
  BlogList,
  About,
  PaymentHistory,
  CreateCourse,
} from "../pages";

import { useEffect } from "react";
import { paths, roles } from "../consts";
import Statics from "../pages/admin/dashboard-admin";
import ManageAdminFeedbacks from "../pages/admin/manage-admin-feedbacks";
import ManagStudents from "../pages/instructor/manage-studdents";
import ManageCourse from "../pages/instructor/manage-course/index";

import ManageInstructorFeedbacks from "../pages/instructor/manage-instructor-feedbacks/index";
import InstrutorDashboard from "../pages/instructor/instructor-dashbaord";

const AppRouter: React.FC = () => {
  const userRole = localStorage.getItem("role"); // Sử dụng localStorage
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("User Role:", userRole);
    if (userRole) {
      redirectBasedOnRole();
    }
  }, [userRole, location.pathname]);

  // Hàm điều hướng dựa trên vai trò của người dùng
  const redirectBasedOnRole = () => {
    const path = location.pathname;
    console.log("Current Path:", path);

    switch (userRole) {
      case "Student":
        if (path.includes("/instructor") || path.includes("/admin")) {
          navigate("/");
        }
        break;
      case "Admin":
        if (!path.includes("/admin")) {
          navigate("/admin/dashboard");
        }
        break;
      case "Instructor":
        if (!path.includes("/instructor")) {
          navigate("/instructor/dashboard");
        }
        break;
      default:
        navigate("/");
        break;
    }
  };

  // Hàm kiểm tra quyền truy cập của người dùng
  const canAccess = (allowedRoles: string[]) => {
    console.log("Allowed Roles:", allowedRoles, "User Role:", userRole);
    return userRole && allowedRoles.includes(userRole);
  };

  return (
    <Routes>
      <Route path={paths.HOME} element={<Home />} />
      <Route path={paths.CONTACT} element={<Contact />} />
      <Route path={paths.LOGIN} element={<LoginPage />} />
      <Route path={paths.ABOUT} element={<About />} />
      <Route path={paths.REGISTER} element={<RegisterPage />} />
      <Route path={paths.TERMS} element={<Terms />} />
      <Route path={paths.POLICY} element={<Policy />} />
      <Route path={paths.GUIDELINES} element={<Guidelines />} />
      <Route path={paths.SUPPORT} element={<Support />} />
      <Route path={paths.BLOG} element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/teaching" element={<BecomeInstructorPage />} />
      <Route path="/create-course" element={<CreateCourse />} />
      {/* <Route path="/course" element={<Course />} /> */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/payment-history" element={<PaymentHistory />} />
      {/* Instructor routes */}
      <Route path="/instructor/dashboard/*" element={canAccess(["Instructor"]) ? <Dashboard /> : <Navigate to="/" />}>
        {/* <Route path="manage-lectures" element={canAccess([roles.INSTRUCTOR]) ? <ManageLectures /> : <Navigate to="/" />} /> */}
        <Route
          path="manage-feedbacks"
          element={canAccess(["Instructor"]) ? <ManageInstructorFeedbacks /> : <Navigate to="/" />}
        />
        <Route path="manage-courses" element={canAccess(["Instructor"]) ? <ManageCourse /> : <Navigate to="/" />} />
        <Route path="manage-students" element={canAccess(["Instructor"]) ? <ManagStudents /> : <Navigate to="/" />} />
        <Route path="statics" element={canAccess(["Instructor"]) ? <InstrutorDashboard /> : <Navigate to="/" />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin/dashboard/*" element={canAccess(["Admin"]) ? <Dashboard /> : <Navigate to="/" />}>
        <Route path="manage-students" element={canAccess(["Admin"]) ? <ManageStudent /> : <Navigate to="/" />} />
        <Route path="manage-instructors" element={canAccess(["Admin"]) ? <ManageInstructor /> : <Navigate to="/" />} />
        <Route path="manage-blogs" element={canAccess(["Admin"]) ? <ManageBlogs /> : <Navigate to="/" />} />
        <Route path="manage-courses" element={canAccess(["Admin"]) ? <ManageCourses /> : <Navigate to="/" />} />
        <Route
          path="manage-feedbacks"
          element={canAccess(["Admin"]) ? <ManageAdminFeedbacks /> : <Navigate to="/" />}
        />
        <Route path="statics" element={canAccess(["Admin"]) ? <Statics /> : <Navigate to="/" />} />
      </Route>

      {/* Other routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
