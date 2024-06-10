import { useLocation } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { Footer, Navbar } from './components';


function App() {
  const location = useLocation();

  const isAdminPath = location.pathname.includes('/admin') || location.pathname.includes('/dashboard');

  return (
    <>
      {!isAdminPath && <Navbar />}
      <AppRouter />
      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;
