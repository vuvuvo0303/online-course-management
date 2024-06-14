import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
  StudentPaymentHistory,
  CreateCourse
} from "../pages";

import { paths, roles } from "../consts";
import Statics from "../pages/admin/dashboard-admin";
import useRoleRedirect from "../hooks";

const AppRouter: React.FC = () => {
  const { canAccess } = useRoleRedirect();

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
      <Route path={paths.BLOG_DETAIL} element={<BlogDetail />} />
      <Route path="/teaching" element={<BecomeInstructorPage />} />
      <Route path={paths.STUDENT_PAYMENT_HISTORY} element={<StudentPaymentHistory />} />
      {/* <Route path="/course" element={<Course />} /> */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      
      {/* Instructor routes */}
      <Route
        path="/instructor/dashboard/*"
        element={canAccess(["Instructor"]) ? <Dashboard /> : <Navigate to="/" />}
      >
        <Route path="create-course" element={<CreateCourse />} />
        <Route path="payment-history" element={<PaymentHistory />} />
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