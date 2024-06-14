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
} from "../pages";
import BlogList from "../pages/blog";
import BlogDetail from "../pages/blog/blogDetail";
import About from "../pages/about";
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

      {/* Profile route for all users */}
      <Route path="/profile" element={<Profile />} />

      {/* Checkout route */}
      <Route path="/checkout" element={<Checkout />} />

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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
