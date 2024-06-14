import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Home,
  LoginPage,
  RegisterPage,
  Course,
  CourseDetail,
  Terms,
  Policy,
  Guidelines,
  Support,
  Contact,
  ManageStudent,
  ManageInstructor,
  ManageBlogs,
  ManageCourses,
  ManageFeedbacks,
  Dashboard,
  ManageLectures,
  BecomeInstructorPage,
  Cart,
  Profile,
  BlogDetail,
  BlogList,
  About,
  PaymentHistory,
  CreateCourse,
  Enrollment,

} from "../pages";

import { useEffect } from "react";
import { paths, roles } from "../consts";
import Statics from "../pages/admin/dashboard-admin";

const AppRouter: React.FC = () => {
  const userRole = sessionStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userRole) {
      redirectBasedOnRole();
    }
  }, [userRole, location.pathname]);

  // Hàm điều hướng dựa trên vai trò của người dùng
  const redirectBasedOnRole = () => {
    const path = location.pathname;

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
      <Route path={paths.CONTACT} element={<Contact />} />
      <Route path={paths.TEACHING} element={<BecomeInstructorPage />} />
      <Route path={paths.CART} element={<Cart />} />
      <Route path="/teaching" element={<BecomeInstructorPage />} />
      <Route path="/course" element={<Course />} />
      <Route path="/course/:id" element={<CourseDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/paymenthistory" element={<PaymentHistory />} />
      <Route path="/create-course" element={<CreateCourse />} />
      <Route path="/enrollment" element={<Enrollment />} />

      {/* Instructor routes */}
      <Route
        path="/instructor/dashboard/*"
        element={canAccess(["Instructor"]) ? <Dashboard /> : <Navigate to="/" />}
      >
        <Route path="manage-lectures" element={canAccess([roles.INSTRUCTOR]) ? <ManageLectures /> : <Navigate to="/" />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin/dashboard/*" element={canAccess(["Admin"]) ? <Dashboard /> : <Navigate to="/" />}>
        <Route path="manage-students" element={canAccess(["Admin"]) ? <ManageStudent /> : <Navigate to="/" />} />
        <Route path="manage-instructors" element={canAccess(["Admin"]) ? <ManageInstructor /> : <Navigate to="/" />} />
        <Route path="manage-blogs" element={canAccess(["Admin"]) ? <ManageBlogs /> : <Navigate to="/" />} />
        <Route path="manage-courses" element={canAccess(["Admin"]) ? <ManageCourses /> : <Navigate to="/" />} />
        <Route path="manage-feedbacks" element={canAccess(["Admin"]) ? <ManageFeedbacks /> : <Navigate to="/" />} />
        <Route path="statics" element={canAccess(["Admin"]) ? <Statics /> : <Navigate to="/" />} />
      </Route>

      {/* Other routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;