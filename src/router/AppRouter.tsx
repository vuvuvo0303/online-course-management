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
  Course,
  ManageStudent,
  ManageInstructor,
  ManageBlogs,
  ManageCategory,
  ManageCourses,
  ManageFeedbacks,
  Dashboard,
  ManageLectures,
  BecomeInstructorPage,
  ManageFeedback,
  Cart,
  Profile,
  Checkout,
  CreateCourse,
  PaymentHistory,
  StudentPaymentHistory,
  About,
  BlogDetail,
  BlogList,
  Enrollment,
  SiteMap,
  NotFound,
} from "../pages";
import useRoleRedirect from "../hooks/index";

import { paths } from "../consts";
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
      <Route path="/course" element={<Course />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/payment-history" element={<StudentPaymentHistory />} />
      <Route path={paths.CONTACT} element={<Contact />} />
      <Route path={paths.TEACHING} element={<BecomeInstructorPage />} />
      <Route path={paths.CART} element={<Cart />} />
      <Route path={paths.NOTFOUND} element={<NotFound />} />

      {/* Profile route for all users */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/instructor/dashboard/profile" element={<Profile />} />
      <Route path="/admin/dashboard/profile" element={<Profile />} />"
      <Route path={paths.PAYMENT_HISTORY} element={<PaymentHistory />} />
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
          path="manage-feedback"
          element={
            canAccess(["Instructor"]) ? <ManageFeedback /> : <Navigate to="/" />
          }
        />
        <Route
          path="manage-lectures"
          element={
            canAccess(["Instructor"]) ? <ManageLectures /> : <Navigate to="/" />
          }
        />

        <Route
          path="payment-history"
          element={
            canAccess(["Instructor"]) ? <PaymentHistory /> : <Navigate to="/" />
          }
        />
        <Route
          path="create-course"
          element={
            canAccess(["Instructor"]) ? <CreateCourse /> : <Navigate to="/" />
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
          path="manage-category"
          element={
            canAccess(["Admin"]) ? <ManageCategory /> : <Navigate to="/" />
          }
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
