import { Routes, Route, Navigate } from "react-router-dom";
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
  Checkout,
  PaymentHistory,
  Enrollment,
  SiteMap,
  NotFound,
} from "../pages";
import BlogList from "../pages/blog";
import BlogDetail from "../pages/blog/blogDetail";
import About from "../pages/about";
import useRoleRedirect from "../hooks/index";

import { paths } from "../consts";
import Course from "../pages/course";
import CourseDetail from "../pages/coursedetail/coursedetail";

const AppRouter: React.FC = () => {
  const { canAccess } = useRoleRedirect();

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
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path={paths.CONTACT} element={<Contact />} />
      <Route path={paths.TEACHING} element={<BecomeInstructorPage />} />
      <Route path={paths.CART} element={<Cart />} />
      <Route path={paths.NOTFOUND} element={<NotFound />} />

      {/* Profile route for all users */}
      <Route path="/profile" element={<Profile />} />

      {/* Checkout route */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path={paths.PAYMENT_HISTORY} element={<PaymentHistory />} />
      <Route path={paths.CONTACT} element={<Contact />} />
      <Route path={paths.COURSE} element={<Course />} />
      <Route path="/course/:id" element={<CourseDetail />} />
      <Route path={paths.ENROLLMENT} element={<Enrollment />} />
      <Route path={paths.SITEMAP} element={<SiteMap />} />

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
        <Route
          path="profile"
          element={
            canAccess(["Instructor"]) ? <Profile /> : <Navigate to="/" />
          }
        />
        <Route
          path="profile"
          element={
            canAccess(["Instructor"]) ? <Profile /> : <Navigate to="/" />
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

      {/* Catch all other routes */}
      <Route path="*" element={<Navigate to="/notfound" />} />
    </Routes>
  );
};

export default AppRouter;
