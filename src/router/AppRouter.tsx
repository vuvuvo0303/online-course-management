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
<<<<<<< HEAD
  // Course,
=======
  Course,
  CourseDetail,
>>>>>>> 511f267a25305d6b2193d7359b55234ae4191896
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
<<<<<<< HEAD
  BlogDetail,
  BlogList,
  About,
  PaymentHistory, 
  CreateCourse
=======
  Enrollment,
>>>>>>> 511f267a25305d6b2193d7359b55234ae4191896
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
<<<<<<< HEAD
      <Route path="/teaching" element={<BecomeInstructorPage />} />
      <Route path="/create-course" element={<CreateCourse />} />
      {/* <Route path="/course" element={<Course />} /> */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/payment-history" element={<PaymentHistory />} />
=======
      <Route path={paths.CONTACT} element={<Contact />} />
      <Route path={paths.TEACHING} element={<BecomeInstructorPage />} />
      <Route path={paths.CART} element={<Cart />} />
      <Route path="/teaching" element={<BecomeInstructorPage />} />
      <Route path="/course" element={<Course />} />
      <Route path="/course/:id" element={<CourseDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/enrollment" element={<Enrollment />} />

>>>>>>> 511f267a25305d6b2193d7359b55234ae4191896
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
        <Route path="manage-courses" element={canAccess(["Admin"]) ? <ManageCourses/>: <Navigate to="/" />} />
        <Route path="manage-feedbacks" element={canAccess(["Admin"]) ? <ManageFeedbacks /> : <Navigate to="/" />} />
        <Route path="statics" element={canAccess(["Admin"]) ? <Statics /> : <Navigate to="/" />} />
      </Route>

      {/* Other routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;