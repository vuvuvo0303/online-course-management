import { Routes, Route, Navigate } from "react-router-dom";
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
    Dashboard,
    BecomeInstructorPage,
    Cart,
    Profile,
    PaymentHistory,
    Enrollment,
    NotFound,
    About,
    StudentPaymentHistory,
    Contact,
    Checkout,
    SiteMap,
    CourseDetail,
    AdminManageFeedbacks,
    InstructorDashboard,
    AdminDashboard,
    InstructorManageBlogs,
    InstructorManageStudents,
    InstructorManageCourses,
    InstructorCreateCourse,
    InstructorManageFeedbacks,
    AdminManageCategories,
    AdminManageBlogs,
    AdminManageCourses,
    InstructorTools,
    InstructorResources,
    CoursesCategory,
    CreateLecture,
    LectureOfCourse,
    InstructorManageLectures,
    ForgotPassword,
    ManageSession,
    CreateUpdateSession,
    InstructorManageCoursesDetail,
    ManageAllSession,
    AdminLoginPage,
    AdminCategoryDetail, VerifyToken, InternalServerError,
} from "../pages";
import { paths, roles } from "../consts";
import { useRoleRedirect } from "../hooks";
import AdminManageUsers from "../pages/admin/manage-users";

const AppRouter: React.FC = () => {
  const { canAccess } = useRoleRedirect();

  return (
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
        <Route path={paths.INTERNAL_SERVER_ERROR} element={<InternalServerError/>} />


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
          element={
            canAccess([roles.INSTRUCTOR]) ? (
              <CreateLecture />
            ) : (
              <Navigate to={paths.HOME} />
            )
          }
        />
        
        <Route
          path={paths.INSTRUCTOR_CREATE_LECTURE_OF_MANAGE_ALL_LECTURES}
          element={
            canAccess([roles.INSTRUCTOR]) ? (
              <CreateLecture />
            ) : (
              <Navigate to={paths.HOME} />
            )
          }
        />
        {/* <Route
          path="manage-lectures"
          element={
            canAccess(["Instructor"]) ? <ManageLectures /> : <Navigate to="/" />
          }
        /> */}
        <Route path={paths.INSTRUCTOR_PROFILE} element={<Profile />} />
        <Route path={paths.INSTRUCTOR_MANAGE_FEEDBACKS} element={<InstructorManageFeedbacks />} />
        <Route
          path={paths.INSTRUCTOR_PAYMENT_HISTORY}
          element={canAccess([roles.INSTRUCTOR]) ? <PaymentHistory /> : <Navigate to={paths.HOME} />}
        />
        <Route
          path={paths.INSTRUCTOR_CREATE_COURSE}
          element={canAccess([roles.INSTRUCTOR]) ? <InstructorCreateCourse /> : <Navigate to={paths.HOME} />}
        />
        <Route
          path={paths.INSTRUCTOR_UPDATE_COURSE}
          element={canAccess([roles.INSTRUCTOR]) ? <InstructorCreateCourse /> : <Navigate to={paths.HOME} />}
        />
        <Route
          path={paths.INSTRUCTOR_UPDATE_COURSE_DETAIL}
          element={canAccess([roles.INSTRUCTOR]) ? <InstructorCreateCourse /> : <Navigate to={paths.HOME} />}
        />
        <Route
          path={paths.INSTRUCTOR_MANAGE_LECTURE}
          element={canAccess([roles.INSTRUCTOR]) ? <InstructorManageLectures /> : <Navigate to={paths.HOME} />}
        />

        <Route
          path={paths.INSTRUCTOR_EDIT_LECTURE}
          element={canAccess([roles.INSTRUCTOR]) ? <CreateLecture /> : <Navigate to={paths.HOME} />}
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
          path={paths.INSTRUCTOR_UPDATE_SESSION_OF_MANAGE_ALL_SESSIONS}
          element={
            canAccess([roles.INSTRUCTOR]) ? (
              <CreateUpdateSession />
            ) : (
              <Navigate to={paths.HOME} />
            )
          }
        />
        <Route
          path={paths.INSTRUCTOR_UPDATE_SESSION}
          element={canAccess([roles.INSTRUCTOR]) ? <CreateUpdateSession /> : <Navigate to={paths.HOME} />}
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path={paths.INSTRUCTOR_MANAGE_COURSE_DETAIL}
          element={canAccess([roles.INSTRUCTOR]) ? <InstructorManageCoursesDetail /> : <Navigate to={paths.HOME} />}
        />
        <Route
          path={paths.INSTRUCTOR_MANAGE_ALL_SESSION}
          element={canAccess([roles.INSTRUCTOR]) ? <ManageAllSession /> : <Navigate to={paths.HOME} />}
        />
        <Route
          path={paths.INSTRUCTOR_CREATE_SESSION_OF_MANAGE_ALL_SESSIONS}
          element={
            canAccess([roles.INSTRUCTOR]) ? (
              <CreateUpdateSession />
            ) : (
              <Navigate to={paths.HOME} />
            )
          }
          
        />
        <Route
          path={paths.INSTRUCTOR_LECTURES_OF_COURSE}
          element={
            canAccess([roles.INSTRUCTOR]) ? (
              <LectureOfCourse />
            ) : (
              <Navigate to={paths.HOME} />
            )
          }
          
        />
        <Route
          path={paths.INSTRUCTOR_UPDATE_LECTURE_OF_MANAGE_ALL_LECTURES}
          element={
            canAccess([roles.INSTRUCTOR]) ? (
              <CreateLecture />
            ) : (
              <Navigate to={paths.HOME} />
            )
          }
          
        />
         <Route
          path={paths.INSTRUCTOR_MANAGE_ALL_LECTURES}
          element={
            canAccess([roles.INSTRUCTOR]) ? (
              <LectureOfCourse />
            ) : (
              <Navigate to={paths.HOME} />
            )
          }
          
        />
      </Route>

      {/* Route for Admin */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/*" element={canAccess([roles.ADMIN]) ? <Dashboard /> : <Navigate to={paths.HOME} />}>
        <Route path={paths.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        <Route path={paths.ADMIN_PAYMENT_HISTORY} element={<PaymentHistory />} />
        <Route path={paths.ADMIN_MANAGE_USERS} element={<AdminManageUsers />} />
        <Route path={paths.ADMIN_MANAGE_CATEGORIES} element={<AdminManageCategories />} />
        <Route path={paths.ADMIN_MANAGE_BLOGS} element={<AdminManageBlogs />} />
        <Route path={paths.ADMIN_MANAGE_COURSES} element={<AdminManageCourses />} />
        <Route path={paths.ADMIN_MANAGE_FEEDBACKS} element={<AdminManageFeedbacks />} />
        <Route path={paths.ADMIN_MANAGE_ALL_SESSION} element={<ManageAllSession />} />
        <Route path={paths.ADMIN_CREATE_SESSION_OF_MANAGE_ALL_SESSIONS} element={<CreateUpdateSession />} />
        <Route path={paths.ADMIN_CATEGORY_DETAIL} element={<AdminCategoryDetail/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<Navigate to={paths.NOTFOUND} />} />
    </Routes>
  );
};

export default AppRouter;
