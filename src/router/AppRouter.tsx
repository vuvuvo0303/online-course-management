import { Route, Routes, Navigate } from 'react-router-dom';
import Contact from '../pages/contact';
import CoursePage from '../pages/course';
import ProtectedRoute from './ProtectedRoute';
import { Dashboard, Guidelines, Home, InstructorPage, LoginPage, ManageBlogs, ManageCourses, ManageFeedbacks, ManageInstructor, ManageLectures, ManageStudent, Policy, RegisterPage, Support, Terms } from '../pages';
import About from '../pages/about';
import BlogList from '../pages/blog';
import BlogDetail from '../pages/blog/blogDetail';
import PaymentHistory from '../pages/payment/paymentHistory';

const AppRouter: React.FC = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/terms" element={<Terms />}>
                <Route path="policy" element={<Policy />} />
                <Route path="guidelines" element={<Guidelines />} />
            </Route>
            <Route path="/support" element={<Support />} />
            <Route path="/instructor" element={<InstructorPage />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            {/* <ProtectedRoute path="/my-cart" element={<YourCartComponent />} />
            <ProtectedRoute path="/my-courses" element={<YourCoursesComponent />} /> */}

            <Route element={<ProtectedRoute roles={['Instructor']} />}>
                <Route path="/dashboard/instructor" element={<Dashboard />}>
                    <Route path="manage-lectures" element={<ManageLectures />} />
                </Route>
            </Route>

            <Route element={<ProtectedRoute roles={['Admin']} />}>
                <Route path="/dashboard/admin" element={<Dashboard />}>
                    <Route path="manage-students" element={<ManageStudent />} />
                    <Route path="manage-instructors" element={<ManageInstructor />} />
                    <Route path="manage-courses" element={<ManageCourses />} />
                    <Route path="manage-blogs" element={<ManageBlogs />} />
                    <Route path="manage-feedbacks" element={<ManageFeedbacks />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;
