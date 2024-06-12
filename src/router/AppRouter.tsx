<<<<<<< HEAD
import { Route, Routes, Navigate } from 'react-router-dom';
import Contact from '../pages/contact';
import CoursePage from '../pages/course';
import ProtectedRoute from './ProtectedRoute';
import { Dashboard, Guidelines, Home, InstructorPage, LoginPage, ManageBlogs, ManageCourses, ManageFeedbacks, ManageInstructor, ManageLectures, ManageStudent, Policy, RegisterPage, Support, Terms } from '../pages';
import About from '../pages/about';
import BlogList from '../pages/blog';
import BlogDetail from '../pages/blog/blogDetail';
import PaymentHistory from '../pages/payment/paymentHistory';
=======
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
} from "../pages";
import BlogList from "../pages/blog";
import BlogDetail from "../pages/blog/blogDetail";
import About from "../pages/about";
import { useEffect } from "react";
>>>>>>> 8267835016fa2932d6bc65406080d8db8ac27e56

const AppRouter: React.FC = () => {
  const userRole = sessionStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation();

<<<<<<< HEAD
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/terms" element={<Terms />}>
                <Route path="policy" element={<Policy />} />
                <Route path="guidelines" element={<Guidelines />} />
            </Route>
            <Route path="/support" element={<Support />} />
            <Route path="/instructor" element={<InstructorPage />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            {/* <ProtectedRoute path="/my-cart" element={<YourCartComponent />} />
            <ProtectedRoute path="/my-courses" element={<YourCoursesComponent />} /> */}
=======
  useEffect(() => {
    if (userRole) {
      redirectBasedOnRole();
    }
  }, [userRole, location.pathname]);

  // Hàm điều hướng dựa trên vai trò của người dùng
  const redirectBasedOnRole = () => {
    const path = location.pathname;
>>>>>>> 8267835016fa2932d6bc65406080d8db8ac27e56

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
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/terms/policy" element={<Policy />} />
      <Route path="/terms/guidelines" element={<Guidelines />} />
      <Route path="/support" element={<Support />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/teaching" element={<BecomeInstructorPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />

      {/* Instructor routes */}

      <Route
        path="/instructor/dashboard/*"
        element={
          canAccess(["Instructor"]) ? <Dashboard /> : <Navigate to="/" />
        }
      >
        <Route
          path="manage-lectures"
          element={
            canAccess(["Instructor"]) ? <ManageLectures /> : <Navigate to="/" />
          }
        />
      </Route>

      {/* Admin routes */}
      <Route
        path="/admin/dashboard/*"
        element={canAccess(["Admin"]) ? <Dashboard /> : <Navigate to="/" />}
      >
        <Route
          path="manage-students"
          element={
            canAccess(["Admin"]) ? <ManageStudent /> : <Navigate to="/" />
          }
        />
        <Route
          path="manage-instructors"
          element={
            canAccess(["Admin"]) ? <ManageInstructor /> : <Navigate to="/" />
          }
        />
        <Route
          path="manage-blogs"
          element={canAccess(["Admin"]) ? <ManageBlogs /> : <Navigate to="/" />}
        />
        <Route
          path="manage-courses"
          element={
            canAccess(["Admin"]) ? <ManageCourses /> : <Navigate to="/" />
          }
        />
        <Route
          path="manage-feedbacks"
          element={
            canAccess(["Admin"]) ? <ManageFeedbacks /> : <Navigate to="/" />
          }
        />
      </Route>

      {/* Other routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
