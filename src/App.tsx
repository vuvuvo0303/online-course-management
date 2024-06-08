<<<<<<< HEAD
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/login';
import About from './pages/about/About';
import RegisterPage from './pages/register';
import Terms from './pages/terms';
import InstructorPage from './pages/instructor';
import BlogList from './pages/blog/BlogList';
import BlogDetail from './pages/blog/BlogDetail';
import Policy from './pages/policy';
import Guidelines from './pages/guideline';
=======
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/login";
import About from "./pages/about/About";
import RegisterPage from "./pages/register";
import Terms from "./pages/terms";
import InstructorPage from "./pages/instructor";
import Policy from "./pages/policy";
import Guidelines from "./pages/guideline";
import Support from "./pages/support";
import BlogList from "./pages/blog/BlogList";
import BlogDetail from "./pages/blog/BlogDetail";
import Contact from "./pages/contact";
import Dashboard from "./components/dashboard";
import ManageLectures from "./pages/instructor/manage-lectures";
import ManageStudent from "./pages/admin/manage-students";
import ManageInstructor from "./pages/admin/manage-instructors";
import ManageCourses from "./pages/admin/manage-courses";
import ManageBlogs from "./pages/admin/manage-blogs";
import ManageFeedbacks from "./pages/admin/manage-feedbacks";
>>>>>>> 72fb2be9b7b46a2fb92ad63bd924cc8cfb19de3b

function App() {
  const location = useLocation();

  // Kiểm tra nếu đường dẫn chứa /admin hoặc /dashboard
  const isAdminPath =
    location.pathname.includes("/admin") ||
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  return (
    <>
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/terms/*" element={<Terms />} />
        <Route path="/terms/policy" element={<Policy />} />
        <Route path="/terms/guidelines" element={<Guidelines />} />
        <Route path="/support" element={<Support />} />
        <Route path="/instructor" element={<InstructorPage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/dashboard/instructor" element={<Dashboard role="Instructor" />}>
          <Route path="manage-lectures" element={<ManageLectures />} />
        </Route>
        <Route path="/dashboard/admin" element={<Dashboard role="Admin" />}>
          <Route path="manage-students" element={<ManageStudent />} />
          <Route path="manage-instructors" element={<ManageInstructor />} />
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route path="manage-blogs" element={<ManageBlogs />} />
          <Route path="manage-feedbacks" element={<ManageFeedbacks />} />
        </Route>
      </Routes>
      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;
