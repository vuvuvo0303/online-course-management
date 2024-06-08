import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/login';
import About from './pages/about';
import RegisterPage from './pages/register';
import Terms from './pages/terms';
import InstructorPage from './pages/instructor';
import CoursePage from './pages/course';

function App() {
  const location = useLocation();

  // Kiểm tra nếu đường dẫn chứa /admin
  const isAdminPath = location.pathname.includes('/admin');

  return (
    <>
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/instructor" element={<InstructorPage />} />
        <Route path="/course" element={<CoursePage />} />
      </Routes>
      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;
