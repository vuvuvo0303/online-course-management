import { Routes, Route, Navigate } from "react-router-dom";
import { paths, roles } from "../consts";
import { useRoleRedirect } from "../hooks";
import { Suspense, lazy } from "react";
import { Skeleton } from "antd";

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
const NameCategory = lazy(() => import("../pages/category"));
const Course = lazy(() => import("../pages/course"));
const AllCourses = lazy(() => import("../pages/course/all-courses"));
const CourseDetails = lazy(() => import("../pages/course-detail"));
const BlogDetail = lazy(() => import("../pages/blog/blog-detail"));
const BlogList = lazy(() => import("../pages/blog"));
const Enrollment = lazy(() => import("../pages/enrollment"));
const SiteMap = lazy(() => import("../pages/sitemap"));
const NotFound = lazy(() => import("../pages/notfound"));
const BecomeInstructorPage = lazy(() => import("../pages/teaching"));
const CoursesCategory = lazy(() => import("../pages/course-by-category"));
const ForgotPassword = lazy(() => import("../pages/forgot-password"));
const InternalServerError = lazy(() => import("../pages/internal-server-error"));
const VerifyToken = lazy(() => import("../pages/verify-token"));
const User = lazy(() => import("../pages/user"));

// Student Page
const ChangePassword = lazy(() => import("../pages/profile/change-password/index"));

const Checkout = lazy(() => import("../pages/checkout"));
const Profile = lazy(() => import("../pages/profile"));
const EditProfile = lazy(() => import("../pages/profile/editProfile/index"));
const Cart = lazy(() => import("../pages/cart"));
const StudentSubscription = lazy(() => import("../pages/student/subscription"));
const StudenManagePurchase = lazy(() => import("../pages/purchase"));
const Lesson = lazy(() => import("../pages/course/lesson"));
const LessonByContent = lazy(() => import("../pages/course/lesson-by-content"));

// Instructor Page
const InstructorManagePayout = lazy(() => import("../pages/instructor/manage-payout"));
const InstructorManagePurchase = lazy(() => import("../pages/instructor/manage-purchase"));
const InstructorDashboard = lazy(() => import("../pages/instructor/instructor-dashboard/index"));
const InstructorManagerReviews = lazy(() => import("../pages/instructor/manage-reviews"));
const InstructorManageCourses = lazy(() => import("../pages/instructor/manage-course/index"));
const InstructorResources = lazy(() => import("../pages/instructor/resources"));
const InstructorTools = lazy(() => import("../pages/instructor/tools"));
const ManageLesson = lazy(() => import("../pages/instructor/manage-course/manage-session/manage-lesson"));
const CreateUpdateLesson = lazy(
  () => import("../pages/instructor/manage-course/manage-session/manage-lesson/create-update-lesson")
);
const UpdateLecture = lazy(
  () => import("../pages/instructor/manage-course/manage-session/manage-lesson/create-update-lesson")
);
// const ManageStudent = lazy(() => import("../pages/instructor/m"))
const ManageSession = lazy(() => import("../pages/instructor/manage-course/manage-session/"));
const InstructorCreateCourse = lazy(() => import("../pages/instructor/manage-course/create-update-course"));
const CreateUpdateSession = lazy(
  () => import("../pages/instructor/manage-course/manage-session/create-update-session")
);
const ManageAllLesson = lazy(() => import("../pages/instructor/manage-course/manage-session/manage-lesson"));
const ManageAllSession = lazy(() => import("../pages/manage-all-session"));
const InstructorManageSubscriptions = lazy(() => import("../pages/instructor/manage-subscriptions"));
// Admin Page
const AdminLoginPage = lazy(() => import("../pages/admin/login"));
const AdminDashboard = lazy(() => import("../pages/admin/dashboard"));
const AdminManageUsers = lazy(() => import("../pages/admin/manage-users"));
const AdminInstructorRequest = lazy(() => import("../pages/admin/instructor-request"));
const ManageAllPurchase = lazy(() => import("../pages/admin/manage-all-purchase/index"));
const AdminManageBlogs = lazy(() => import("../pages/admin/manage-blogs"));
const AdminManageCategories = lazy(() => import("../pages/admin/manage-categories"));
const AdminManageCourses = lazy(() => import("../pages/admin/manage-course"));
const AdminManageReviews = lazy(() => import("../pages/admin/manage-reviews"));
const AdminManagePayouts = lazy(() => import("../pages/admin/manage-payouts"))
const Dashboard = lazy(() => import("../components/dashboard/index"));

const AppRouter: React.FC = () => {
  const { canAccess } = useRoleRedirect();
  return (
    <Suspense fallback={<Skeleton active />}>
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
        <Route path={paths.NAME_CATEGORY} element={<NameCategory />} />
        <Route path={paths.COURSE} element={<Course />} />
        <Route path={paths.ALL_COURSES} element={<AllCourses />} />
        <Route path={paths.BLOG_DETAIL} element={<BlogDetail />} />
        <Route path={paths.CONTACT} element={<Contact />} />
        <Route path={paths.SITEMAP} element={<SiteMap />} />
        <Route path={paths.TEACHING} element={<BecomeInstructorPage />} />
        <Route path={paths.NOTFOUND} element={<NotFound />} />
        <Route path="/courses/:id" element={<CoursesCategory />} />
        <Route path={paths.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={paths.VERIFY_TOKEN} element={<VerifyToken />} />
        <Route path={paths.INTERNAL_SERVER_ERROR} element={<InternalServerError />} />
        <Route path={paths.COURSE_DETAILS} element={<CourseDetails />} />
        <Route path={paths.USER_DETAIL} element={<User />} />

        {/* Route for Student */}
        <Route path={paths.STUDENT_PROFILE} element={<Profile />} />
        <Route path={paths.STUDENT_EDIT_PROFILE} element={<EditProfile />} />

        <Route path={paths.STUDENT_CART} element={<Cart />} />
        <Route path={paths.STUDENT_CHECKOUT} element={<Checkout />} />
        <Route path={paths.STUDENT_ENROLLMENT} element={<Enrollment />} />
        <Route path={paths.STUDENT_CHANGEPASSWORD} element={<ChangePassword />} />
        <Route path={paths.STUDENT_PURCHASE} element={<StudenManagePurchase />} />
        <Route path={paths.STUDENT_SUBSCRIPTION} element={<StudentSubscription />} />
        <Route path={paths.LESSON} element={<Lesson />} />
        <Route path={paths.LESSON_BY_CONTENT} element={<LessonByContent />} />
        {/* Route for Instructor */}

        <Route
          path="/instructor/*"
          element={canAccess([roles.INSTRUCTOR]) ? <Dashboard /> : <Navigate to={paths.HOME} />}
        >
          <Route
            path={paths.INSTRUCTOR_LEARN}
            element={canAccess([roles.INSTRUCTOR]) ? <AllCourses /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_LEARN_COURSE}
            element={canAccess([roles.INSTRUCTOR]) ? <CourseDetails />
              : <Navigate to={paths.HOME} />
            }
          />
          <Route
            path={paths.INSTRUCTOR_MANAGE_REVIEWS}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorManagerReviews /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_PROFILE}
            element={canAccess([roles.INSTRUCTOR]) ? <Profile /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_MANAGE_COURSES}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorManageCourses /> : <Navigate to={paths.HOME} />}
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
            element={canAccess([roles.INSTRUCTOR]) ? <CreateUpdateLesson /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_CREATE_LECTURE_OF_MANAGE_ALL_LECTURES}
            element={canAccess([roles.INSTRUCTOR]) ? <CreateUpdateLesson /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_MANAGE_ALL_LECTURES}
            element={canAccess([roles.INSTRUCTOR]) ? <ManageAllLesson /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_CREATE_LECTURE_OF_MANAGE_ALL_LECTURES}
            element={canAccess([roles.INSTRUCTOR]) ? <CreateUpdateLesson /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_UPDATE_LECTURE_OF_MANAGE_ALL_LECTURES}
            element={canAccess([roles.INSTRUCTOR]) ? <CreateUpdateLesson /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_UPDATE_LECTURE}
            element={canAccess([roles.INSTRUCTOR]) ? <UpdateLecture /> : <Navigate to={paths.HOME} />}
          />
          <Route path={paths.INSTRUCTOR_PROFILE} element={<Profile />} />
          <Route
            path={paths.INSTRUCTOR_CREATE_COURSE}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorCreateCourse /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_UPDATE_COURSE}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorCreateCourse /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_LECTURES_OF_COURSE}
            element={canAccess([roles.INSTRUCTOR]) ? <ManageLesson /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_MANAGE_SESSION_OF_COURSE}
            element={canAccess([roles.INSTRUCTOR]) ? <ManageSession /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_CREATE_SESSION}
            element={canAccess([roles.INSTRUCTOR]) ? <CreateUpdateSession /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_UPDATE_SESSION}
            element={canAccess([roles.INSTRUCTOR]) ? <CreateUpdateSession /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_MANAGE_ALL_SESSION}
            element={canAccess([roles.INSTRUCTOR]) ? <ManageAllSession /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_LESSON_OF_MANAGE_ALL_SESSIONS}
            element={canAccess([roles.INSTRUCTOR]) ? <ManageLesson /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_CREATE_SESSION_OF_MANAGE_ALL_SESSIONS}
            element={canAccess([roles.INSTRUCTOR]) ? <CreateUpdateSession /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_UPDATE_SESSION_OF_MANAGE_ALL_SESSIONS}
            element={canAccess([roles.INSTRUCTOR]) ? <CreateUpdateSession /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_MANAGE_SUPSCRIPTIONS}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorManageSubscriptions /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_MANAGE_PURCHASES}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorManagePurchase /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_MANAGE_PAYOUTS}
            element={canAccess([roles.INSTRUCTOR]) ? <InstructorManagePayout /> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_LEARN_CART}
            element={canAccess([roles.INSTRUCTOR]) ? <Cart/> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_LESSON}
            element={canAccess([roles.INSTRUCTOR]) ? <Lesson/> : <Navigate to={paths.HOME} />}
          />
          <Route
            path={paths.INSTRUCTOR_LEARN_CHECKOUT}
            element={canAccess([roles.INSTRUCTOR]) ? <Checkout /> : <Navigate to={paths.HOME} />}
          />

          <Route path="*" element={<NotFound />} />

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
            path={paths.ADMIN_INSTRUCTOR_REQUEST}
            element={canAccess([roles.ADMIN]) ? <AdminInstructorRequest /> : <Navigate to={paths.ADMIN_LOGIN} />}
          />
          <Route
            path={paths.ADMIN_MANAGE_PURCHASE}
            element={canAccess([roles.ADMIN]) ? <ManageAllPurchase /> : <Navigate to={paths.ADMIN_LOGIN} />}
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
            path={paths.ADMIN_MANAGE_COURSES}
            element={canAccess([roles.ADMIN]) ? <AdminManageCourses /> : <Navigate to={paths.ADMIN_LOGIN} />}
          />
          <Route
            path={paths.ADMIN_MANAGE_REVIEWS}
            element={canAccess([roles.ADMIN]) ? <AdminManageReviews /> : <Navigate to={paths.ADMIN_LOGIN} />}
          />
          <Route
            path={paths.ADMIN_MANAGE_PAYOUTS}
            element={canAccess([roles.ADMIN]) ? <AdminManagePayouts /> : <Navigate to={paths.ADMIN_LOGIN} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
