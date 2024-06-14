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
  ManageCategory,
  ManageCourses,
  ManageFeedbacks,
  Dashboard,
  ManageLectures,
  BecomeInstructorPage,
  Cart,
  Profile,
  Checkout,
  CreateCourse,
  PaymentHistory,
  StudentPaymentHistory,
  About,
  BlogDetail,
  BlogList,
} from "../pages";
import useRoleRedirect from "../hooks/index";

const AppRouter: React.FC = () => {
  const { canAccess } = useRoleRedirect();

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
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/teaching" element={<BecomeInstructorPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment-history" element={<StudentPaymentHistory />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/instructor/dashboard/profile" element={<Profile />} />
      <Route path="/admin/dashboard/profile" element={<Profile />} />"
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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
