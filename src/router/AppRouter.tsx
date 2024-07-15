import { Routes, Route, Navigate } from "react-router-dom";
import { paths, roles } from "../consts";
import { useRoleRedirect } from "../hooks";
import { Suspense, lazy } from "react";

// Guest Page
const Home = lazy(() => import("../pages/home"));
const Contact = lazy(() => import("../pages/contact"));
const LoginPage = lazy(() => import("../pages/login"));
const RegisterPage = lazy(() => import("../pages/register"));
const Support = lazy(() => import("../pages/support"));
const Policy = lazy(() => import("../pages/policy"));
const Terms = lazy(() => import("../pages/terms"));
const Guidelines = lazy(() => import("../pages/guideline"));
const About = lazy(() => import("../pages/about"));
const Course = lazy(() => import("../pages/course"));
const BlogDetail = lazy(() => import("../pages/blog/blog-detail"));
const BlogList = lazy(() => import("../pages/blog"));
const Enrollment = lazy(() => import("../pages/enrollment"));
const SiteMap = lazy(() => import("../pages/sitemap"));
const NotFound = lazy(() => import("../pages/notfound"));
const CourseDetail = lazy(() => import("../pages/course-detail"));
const BecomeInstructorPage = lazy(() => import("../pages/teaching"));
const CoursesCategory = lazy(() => import("../pages/courses"));
const ForgotPassword = lazy(() => import("../pages/forgot-password"));
const InternalServerError = lazy(() => import("../pages/internal-server-error"));
const VerifyToken = lazy(() => import("../pages/verify-token"));

// Student Page
const StudentPaymentHistory = lazy(() => import("../pages/payment/studentPaymentHistory"));
const Checkout = lazy(() => import("../pages/checkout"));
const Profile = lazy(() => import("../pages/profile"));
const Cart = lazy(() => import("../pages/cart"));

// Instructor Page
const InstructorDashboard = lazy(() => import("../pages/instructor/instructor-dashboard/index"));
const InstructorManageLectures = lazy(() => import("../pages/instructor/manage-lectures"));
const InstructorManageFeedbacks = lazy(() => import("../pages/instructor/manage-feedback"));
const PaymentHistory = lazy(() => import("../pages/payment/payment-history"));
const InstructorManageCourses = lazy(() => import("../pages/instructor/manage-course/index"));
const InstructorManageStudents = lazy(() => import("../pages/instructor/manage-students"));
const InstructorManageBlogs = lazy(() => import("../pages/instructor/manage-blogs/index"));
const InstructorResources = lazy(() => import("../pages/instructor/resources"));
const InstructorTools = lazy(() => import("../pages/instructor/tools"));
const LectureOfCourse = lazy(() => import("../pages/instructor/manage-course/manage-session/lectures-of-course"));
const CreateLecture = lazy(() => import("../pages/instructor/manage-course/manage-session/lectures-of-course/create-update-page"));
const ManageSession = lazy(() => import("../pages/instructor/manage-course/manage-session/"));
const CreateUpdateSession = lazy(() => import("../pages/instructor/manage-course/manage-session/create-update-session"));
const InstructorManageCoursesDetail = lazy(() => import("../pages/instructor/manage-course/course-detail"));
const ManageAllSession = lazy(() => import("../pages/manage-all-session"));

// Admin Page
const AdminLoginPage = lazy(() => import("../pages/admin/login"));
const AdminDashboard = lazy(() => import("../pages/admin/dashboard"));
const AdminManageUsers = lazy(() => import("../pages/admin/manage-users"));
const AdminManageBlogs = lazy(() => import("../pages/admin/manage-blogs"));
const AdminManageCategories = lazy(() => import("../pages/admin/manage-categories"));
const AdminCategoryDetail = lazy(() => import("../pages/admin/manage-categories/detail"));
const AdminManageCourses = lazy(() => import("../pages/admin/manage-course"));
const AdminManageFeedbacks = lazy(() => import("../pages/admin/manage-feedbacks"));
const Dashboard = lazy(() => import("../components/dashboard/index"));


const AppRouter: React.FC = () => {
  const { canAccess } = useRoleRedirect();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Route for Guest */}
        <Route path={paths.HOME} element={<Home />} />
        <Route path={paths.LOGIN} element={<LoginPage />} />
        <Route path={paths.ABOUT} element={<About />} />
        <Route path={paths.REGISTER} element={<RegisterPage />} />
        <Route path={paths.TERMS} element={<Terms />} />
        <Route path={paths.POLICY} element={<Policy />} />
        <Route path={paths.GUIDELINES} element={<Guidelines />} />
        <Route path={paths.SUPPORT} element={<Support />} />
        <Route path={paths.BLOGS} element={<BlogList />} />
        <Route path={paths.COURSE} element={<Course />} />
        <Route path={paths.BLOG_DETAIL} element={<BlogDetail />} />
        <Route path={paths.CONTACT} element={<Contact />} />
        <Route path={paths.SITEMAP} element={<SiteMap />} />
        <Route path={paths.TEACHING} element={<BecomeInstructorPage />} />
        <Route path={paths.NOTFOUND} element={<NotFound />} />
        <Route path="/courses/:id" element={<CoursesCategory />} />
        <Route path={paths.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={paths.VERIFY_TOKEN} element={<VerifyToken />} />
        <Route path={paths.INTERNAL_SERVER_ERROR} element={<InternalServerError />} />

        {/* Route for Student */}
        <Route path={paths.STUDENT_PAYMENT_HISTORY} element={<StudentPaymentHistory />} />
        <Route path={paths.STUDENT_PROFILE} element={<Profile />} />
        <Route path={paths.STUDENT_CART} element={<Cart />} />
        <Route path={paths.STUDENT_CHECKOUT} element={<Checkout />} />
        <Route path={paths.COURSE_DETAIL} element={<CourseDetail />} />
        <Route path={paths.STUDENT_ENROLLMENT} element={<Enrollment />} />

        {/* Route for Instructor */}
        <Route path="/instructor/*" element={canAccess([roles.INSTRUCTOR]) ? <Dashboard /> : <Navigate to={paths.HOME} />}>
          <Route
            path={paths.INSTRUCTOR_MANAGE_FEEDBACKS}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorManageFeedbacks /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_MANAGE_COURSES}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorManageCourses /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path="manage-students"
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorManageStudents /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path="manage-blogs"
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorManageBlogs /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_DASHBOARD}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorDashboard /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_TOOLS}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorTools /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_RESOURCES}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorResources /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_CREATE_LECTURE}
            element={canAccess([roles.INSTRUCTOR]) ? <CreateLecture /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_CREATE_LECTURE_OF_MANAGE_ALL_LECTURES}
            element={canAccess([roles.INSTRUCTOR]) ? <CreateLecture /> : <Navigate to={paths.HOME} />}
          />
          <Route path={paths.INSTRUCTOR_PROFILE} element={<Profile />} />
          <Route path={paths.INSTRUCTOR_MANAGE_FEEDBACKS} element={<InstructorManageFeedbacks />} />
          <Route
            path={paths.INSTRUCTOR_PAYMENT_HISTORY}
            element={canAccess([roles.INSTRUCTOR]) ? <PaymentHistory /> : <Navigate to={paths.HOME} />}
          />
          {/* <Route
            path={paths.INSTRUCTOR_CREATE_COURSE}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorCreateCourse /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_UPDATE_COURSE}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorCreateCourse /> : <Navigate to={paths.HOME} />}
          /> */}
          {/* <Route
            path={paths.INSTRUCTOR_UPDATE_COURSE_DETAIL}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorCreateCourse /> : <Navigate to={paths.HOME} />}
          /> */}
          <Route
            path={paths.INSTRUCTOR_MANAGE_LECTURE}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorManageLectures /> : <Navigate to={paths.HOME} />}
          />
          {/* <Route
            path={paths.INSTRUCTOR_MANAGE_COURSES_DETAIL}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorManageCoursesDetail /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.LECTURE_OF_COURSE}
            element={canAccess([roles.INSTRUCTOR]) ? <LectureOfCourse /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_MANAGE_SESSION}
            element={canAccess([roles.INSTRUCTOR]) ? <ManageSession /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_CREATE_UPDATE_SESSION}
            element={canAccess([roles.INSTRUCTOR]) ? <CreateUpdateSession /> : <Navigate to={paths.HOME} />}
          /> */}
          <Route
            path={paths.INSTRUCTOR_MANAGE_ALL_SESSION}
            element={canAccess([roles.INSTRUCTOR]) ? <ManageAllSession /> : <Navigate to={paths.HOME} />}
          />
        </Route>

        {/* Route for Admin */}
        <Route path={paths.ADMIN_LOGIN} element={<AdminLoginPage />} />
        <Route path="/admin/*" element={canAccess([roles.ADMIN]) ? <Dashboard /> : <Navigate to={paths.ADMIN_LOGIN} />}>
          <Route
            path={paths.ADMIN_DASHBOARD}
            element={canAccess([roles.ADMIN]) ? <AdminDashboard /> : <Navigate to={paths.ADMIN_LOGIN} />}
          />
          <Route
            path={paths.ADMIN_MANAGE_USERS}
            element={canAccess([roles.ADMIN]) ? <AdminManageUsers /> : <Navigate to={paths.ADMIN_LOGIN} />}
          />
          <Route
            path={paths.ADMIN_MANAGE_BLOGS}
            element={canAccess([roles.ADMIN]) ? <AdminManageBlogs /> : <Navigate to={paths.ADMIN_LOGIN} />}
          />
          <Route
            path={paths.ADMIN_MANAGE_CATEGORIES}
            element={canAccess([roles.ADMIN]) ? <AdminManageCategories /> : <Navigate to={paths.ADMIN_LOGIN} />}
          />
          <Route
            path={paths.ADMIN_CATEGORY_DETAIL}
            element={canAccess([roles.ADMIN]) ? <AdminCategoryDetail /> : <Navigate to={paths.ADMIN_LOGIN} />}
          />
          <Route
            path={paths.ADMIN_MANAGE_COURSES}
            element={canAccess([roles.ADMIN]) ? <AdminManageCourses /> : <Navigate to={paths.ADMIN_LOGIN} />}
          />
          <Route
            path={paths.ADMIN_MANAGE_FEEDBACKS}
            element={canAccess([roles.ADMIN]) ? <AdminManageFeedbacks /> : <Navigate to={paths.ADMIN_LOGIN} />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;

