

import { Routes, Route, Navigate } from "react-router-dom";
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

} from "../pages";
import BlogList from "../pages/blog";
import BlogDetail from "../pages/blog/blogDetail";
import About from "../pages/about";
import useRoleRedirect from "../hooks/index";
import { paths, roles } from "../consts";

const AppRouter: React.FC = () => {
  const { canAccess } = useRoleRedirect();

  return (
    <Routes>
      <Route path={paths.HOME} element={<Home />} />
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

      {/* Instructor routes */}
      <Route
        path="/instructor/dashboard/*"
        element={canAccess(["Instructor"]) ? <Dashboard /> : <Navigate to="/" />}
      >
        <Route path="manage-lectures" element={canAccess([roles.INSTRUCTOR]) ? <ManageLectures /> : <Navigate to="/" />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin/dashboard/*" element={canAccess([roles.ADMIN]) ? <Dashboard /> : <Navigate to="/" />}>
        <Route path="manage-students" element={canAccess([roles.ADMIN]) ? <ManageStudent /> : <Navigate to="/" />} />
        <Route path="manage-instructors" element={canAccess([roles.ADMIN]) ? <ManageInstructor /> : <Navigate to="/" />} />
        <Route path="manage-blogs" element={canAccess([roles.ADMIN]) ? <ManageBlogs /> : <Navigate to="/" />} />
        <Route path="manage-courses" element={canAccess([roles.ADMIN]) ? <ManageCourses /> : <Navigate to="/" />} />
        <Route path="manage-feedbacks" element={canAccess([roles.ADMIN]) ? <ManageFeedbacks /> : <Navigate to="/" />} />
      </Route>

      {/* Other routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
