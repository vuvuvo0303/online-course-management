import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/login';
import About from './pages/about';
import RegisterPage from './pages/register';
import Terms from './pages/terms';
import Dashboard from './components/dashboard';
import ManageLectures from './pages/instructor/manage-lectures';
import ManageStudent from './pages/admin/manage-students';
import ManageInstructor from './pages/admin/manage-instructors';

function App() {
  const location = useLocation();

  // Kiểm tra nếu đường dẫn chứa /admin hoặc /dashboard
  const isAdminPath = location.pathname.includes('/admin') || location.pathname.includes('/dashboard');

  return (
    <>
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/dashboard/instructor" element={<Dashboard role="Instructor" />}>
          <Route path="manage-lectures" element={<ManageLectures />} />
        </Route>
        <Route path="/dashboard/admin" element={<Dashboard role="Admin" />}>
          <Route path="manage-students" element={<ManageStudent />} />
          <Route path="manage-instructors" element={<ManageInstructor/>} />

        </Route>
      </Routes>
      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;
