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

function App() {
  const location = useLocation();

  // Check if the path includes /admin
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
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;
