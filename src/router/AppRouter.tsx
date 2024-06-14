import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  LoginPage,
  RegisterPage,
  Terms,
  Policy,
  Guidelines,
  Support,
  BlogList,
  BlogDetail,
  Course,
  ManageStudent,
  ManageInstructor,
  ManageBlogs,
  ManageCourses,
  Dashboard,
  BecomeInstructorPage,
  ManageFeedback,
  Cart,
  Profile,
  PaymentHistory,
  Enrollment,
  NotFound,
  ManageFeedbacks,
  About,
  StudentPaymentHistory,
  Contact,
  Checkout,
  SiteMap,
  CreateCourse,
} from "../pages";
import useRoleRedirect from "../hooks/index";
import { useEffect } from "react";
import { paths } from "../consts";
import Statics from "../pages/admin/dashboard-admin";
import ManageAdminFeedbacks from "../pages/admin/manage-admin-feedbacks";
import ManageCourse from "../pages/instructor/manage-course";
import ManageStudentInstructor from "../pages/instructor/manage-studdents";
import ManageBlogsInstructor from "../pages/instructor/manage-blogs";
import InstrutorDashboard from "../pages/instructor/instructor-dashbaord";
import CourseDetail from "../pages/coursedetail/coursedetail";


const AppRouter: React.FC = () => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("User Role:", userRole);
    if (userRole) {
      redirectBasedOnRole();
    }
  }, [userRole, location.pathname]);

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

  const canAccessRoute = (allowedRoles: string[]) => {
    console.log("Allowed Roles:", allowedRoles, "User Role:", userRole);
    return userRole && allowedRoles.includes(userRole);
  };

  return (
    <Routes>
       <Route path={paths.HOME} element={<Home />} />
      <Route path={paths.LOGIN} element={<LoginPage />} />
      <Route path={paths.ABOUT} element={<About />} />
      <Route path={paths.REGISTER} element={<RegisterPage />} />
      <Route path={paths.TERMS} element={<Terms />} />
      <Route path="/terms/policy" element={<Policy />} />
      <Route path="/terms/guidelines" element={<Guidelines />} />
      <Route path={paths.SUPPORT} element={<Support />} />
      <Route path={paths.BLOG} element={<BlogList />} />
      <Route path="/course" element={<Course />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/payment-history" element={<StudentPaymentHistory />} />
      <Route path={paths.CONTACT} element={<Contact />} />
      <Route path={paths.TEACHING} element={<BecomeInstructorPage />} />
      <Route path={paths.CART} element={<Cart />} />
      <Route path={paths.NOTFOUND} element={<NotFound />} />

      {/* Profile route for all users */}
      <Route path="/profile" element={<Profile />} />

      {/* Checkout route */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/instructor/dashboard/profile" element={<Profile />} />
      <Route path={paths.PAYMENT_HISTORY} element={<PaymentHistory />} />
      <Route path="/course/:id" element={<CourseDetail />} />
      <Route path={paths.ENROLLMENT} element={<Enrollment />} />
      <Route path={paths.SITEMAP} element={<SiteMap />} />

      {/* instructor setup router in here please  (just for dashboard instructor) */}
      <Route
        path="/instructor/dashboard/*"
        element={canAccessRoute(["Instructor"]) ? <Dashboard /> : <Navigate to="/" />}
      >
        <Route path="manage-feedbacks" element={<ManageFeedbacks />} />
        <Route path="manage-courses" element={<ManageCourse />} />
        <Route path="manage-students" element={<ManageStudentInstructor />} />
        <Route path="manage-blogs" element={<ManageBlogsInstructor />} />
        <Route path="statics" element={<InstrutorDashboard />} />
      </Route>
      {/* admin setup router in here please (just for dashboard admin) */}
      <Route path="/admin/dashboard/*" element={canAccessRoute(["Admin"]) ? <Dashboard /> : <Navigate to="/" />}>
        <Route path="manage-students" element={<ManageStudent />} />
        <Route path="manage-instructors" element={<ManageInstructor />} />
        <Route path="manage-blogs" element={<ManageBlogs />} />
        <Route path="manage-courses" element={<ManageCourses />} />
        <Route path="manage-rate" element={<ManageFeedback />} />
        <Route path="manage-feedbacks" element={<ManageAdminFeedbacks />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create-course" element={<CreateCourse />} />
        <Route path="payments-history" element={<PaymentHistory />} />


        <Route path="statics" element={<Statics />} />
      </Route>
      {/* Catch all other routes */}
      <Route path="*" element={<Navigate to="/notfound" />} />
    </Routes>
  );
};

export default AppRouter;
