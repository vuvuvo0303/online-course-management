import {
  Routes,
  Route,
  Navigate,
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
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path={paths.TEACHING} element={<BecomeInstructorPage />} />
      <Route path="/create-course" element={<CreateCourse />} />
      <Route path={paths.CART} element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path={paths.PAYMENT_HISTORY} element={<PaymentHistory />} />
      <Route path={paths.CONTACT} element={<Contact />} />
      <Route path={paths.COURSE} element={<Course />} />
      <Route path="/course/:id" element={<CourseDetail />} />
      <Route path={paths.ENROLLMENT} element={<Enrollment />} />

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