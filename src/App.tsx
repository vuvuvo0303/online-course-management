import { useLocation } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { Footer, Navbar } from './components';

function App() {
  const location = useLocation();

  const isAdminPath = location.pathname.includes('/admin') || location.pathname.includes('/dashboard');
  const isCourseDetailPath = location.pathname.includes('/course/');

  return (
    <>
      {!isAdminPath && !isCourseDetailPath && <Navbar />}
      <AppRouter />
      {!isAdminPath && !isCourseDetailPath && <Footer />}
    </>
  );
}

export default App;
