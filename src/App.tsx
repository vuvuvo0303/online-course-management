import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/main/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const location = useLocation();

  // Kiểm tra nếu đường dẫn chứa /admin
  const isAdminPath = location.pathname.includes('/admin');

  return (
    <>
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;
